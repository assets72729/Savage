
# Telegram Bot Configuration

This repository contains the configuration settings for the Telegram bot. The bot is designed to perform a variety of actions such as sending and managing messages, handling commands, storing files, and interacting with users across multiple channels and groups.

This project was created for **skill improvement** and is implemented in **TypeScript**.

## Table of Contents

- [Introduction](#introduction)
- [Configuration Settings](#configuration-settings)
- [Setup Instructions](#setup-instructions)
- [How to Use](#how-to-use)
- [License](#license)

## Introduction

This bot configuration allows you to manage multiple functions, including command handling, file storage, and communication with users and groups. The bot must be an **admin** in the specified channels and groups to function properly.

## Configuration Settings

Below are the key environment variables to configure your bot. Add these variables to your `.env` file, replacing each placeholder with actual data.

```plaintext
# List of Telegram user IDs with admin privileges
ADMIN_IDS=id1 id2 ...

# Allowed groups where the bot can respond
ALLOW_GROUPS=groupid1 groupid2 ...

# Backup Telegram link
BACKUP=your_backup_telegram_link

# Bot username (set via BotFather)
BOT_USERNAME=your_bot_username

# Main channel where the bot is an admin
COLLECTION_AIO=channel_id_where_bot_is_admin

# MongoDB connection string
DATABASE_URL=your_mongodb_connection_string

# Channel where files are stored
DB_AIO_CHANNEL_ID=channel_where_files_are_stored

# Optional: Ongoing tasks channel ID
DB_OG_CHANNEL_ID=ongoing_channel_id

# Optional: Force users to join specific channels before using the bot
FORCE_CHANNEL_IDS=optional_force_channel_ids

# Tag to add in file for ongoing tasks
JOIN=add_a_tag_in_file

# Log group ID
LOG_GROUP=your_log_group_id

# Bot token obtained from BotFather
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather

# Webhook domain
WEBHOOK_DOMAIN=your_webhook_domain
```

## Setup Instructions

1. Clone this repository to your local machine or server.
2. Install the required dependencies using `npm install`.
3. Set up your `.env` file with the necessary values (refer to the configuration settings above).
4. Start the bot locally using `npm run dev`.

### To Deploy on Render:

1. **Create a Render Account**:  
   Go to [Render](https://render.com/) and sign up for an account if you don't have one.

2. **Create a New Web Service**:

   - Click on **New** and select **Web Service**.
   - Select **Public repository** and enter the repository URL.
   - Choose the branch you want to deploy (usually `main` or `master`).

3. **Configure Environment Variables**:

   - In the **Environment** section of the Render service setup, add the necessary environment variables (like the values from your `.env` file).
   - Render will automatically use these environment variables when deploying the application.

4. **Deploy the Bot**:

   - After setting the environment variables, Render will automatically deploy the bot.
   - You can monitor the deployment process in the Render dashboard.

5. **Access the Bot**:
   - Once deployed, copy the domain from the Render dashboard and update the `WEBHOOK_DOMAIN` environment variable with this domain.

## How to Use

- Once the bot is configured and running, you can interact with it using the available commands.
- Use the `/help` command to see available options.
- Ensure that the bot is an admin in the specified channels and groups to perform the necessary actions.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
