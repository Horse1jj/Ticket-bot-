import { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextChannel } from 'discord.js';
import config from './config.json';
import fs from 'fs';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Load panel configurations from the "panels" folder
const panels: Record<string, any> = {};
fs.readdirSync('./src/panels').forEach(file => {
  if (file.endsWith('.json')) {
    const panel = require(`./panels/${file}`);
    panels[panel.id] = panel;
  }
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

// Create a ticket panel in a channel
async function createTicketPanel(panelId: string, channelId: string) {
  const panel = panels[panelId];
  if (!panel) return console.log(`Panel ${panelId} not found.`);

  const channel = await client.channels.fetch(channelId) as TextChannel;
  if (!channel) return console.log(`Channel ${channelId} not found.`);

  const embed = new EmbedBuilder()
    .setTitle(panel.title)
    .setDescription(panel.description)
    .setColor(panel.color);

  const button = new ButtonBuilder()
    .setCustomId(`create_ticket_${panelId}`)
    .setLabel('Open Ticket')
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);
  await channel.send({ embeds: [embed], components: [row] });
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  const [action, panelId] = interaction.customId.split('_');
  if (action === 'create' && panelId) {
    const panel = panels[panelId];
    if (!panel) return interaction.reply({ content: 'Panel configuration not found.', ephemeral: true });

    const ticketChannel = await interaction.guild?.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: 0,
      parent: config.categoryId,
      permissionOverwrites: [
        { id: interaction.guild?.id, deny: ['ViewChannel'] },
        { id: interaction.user.id, allow: ['ViewChannel', 'SendMessages', 'AttachFiles'] },
        { id: panel.roleId, allow: ['ViewChannel', 'SendMessages'] }
      ]
    });

    if (!ticketChannel) return interaction.reply({ content: 'Failed to create ticket channel.', ephemeral: true });

    await ticketChannel.send(`Ticket created by ${interaction.user}`);
    await interaction.reply({ content: 'Ticket created!', ephemeral: true });
  }
});

client.login(config.token);
