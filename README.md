# ticket bot 


This is a Discord ticket bot built with TypeScript and `discord.js`. The bot allows server admins to create custom ticket panels where users can open tickets. Each panel can have its own settings, such as custom titles, descriptions, and access roles.

## Features

- **Custom Ticket Panels**: Configure multiple ticket panels (e.g., support, sales) with individual settings.
- **User-friendly Ticket Creation**: Users can click a button in a panel to create a private ticket channel.
- **Configurable Permissions**: Each ticket can have different access permissions, allowing specific roles to view and manage tickets.

## Prerequisites

1. [Node.js](https://nodejs.org/) (version 16.6.0 or higher)
2. A Discord bot token (available from the [Discord Developer Portal](https://discord.com/developers/applications))
3. Discord server and permissions to manage channels

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/discord-ticket-bot.git
   cd -ticket-bot

2. install dependincies 

   ```npm install```

2. Compile TypeScript to JavaScript:

     ```tsc```

## configuration 

Create a `config.json` file in the `src` folder. This file should contain your bot token and other default settings:

``` json 

{
  "token": "YOUR_BOT_TOKEN",
  "guildId": "YOUR_GUILD_ID",
  "categoryId": "TICKET_CATEGORY_ID"
}

```

* token: Your Discord bot token
* guildId: The ID of your Discord server
* categoryId: The ID of the category under which all tickets will be created

## 2. ticket panels 

Ticket panels are configured using JSON files stored in the `src/panels/` directory. Each panel file represents a different type of ticket (e.g., support, feedback) and should have the following structure:
