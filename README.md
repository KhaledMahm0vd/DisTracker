# DisTracker
## Step 1: Create a Discord Webhook
First, you need a Webhook URL from the Discord server and channel where you want to receive notifications.

1. Go to Server Settings: Right-click your server icon and go to Server Settings > Integrations.

2. Create a Webhook: Click on Webhooks and then New Webhook.

3. Customize and Copy: Give your Webhook a name (e.g., "File Monitor Bot"), choose the desired channel, and click Copy Webhook URL.

Keep this URL safe! Anyone with it can post messages to your channel.
## Step 2: Set Up Your Node.js Project
Now, let's set up the project to run the monitoring script.

Initialize npm: Open your terminal in your project folder and run this command to create a package.json file.

```bash
npm init -y
```
Install Libraries: We'll use axios to send requests to Discord and dotenv to safely manage our Webhook URL.

```bash
npm install axios dotenv diff
```

## Step 3: Create a .env File
To keep your Webhook URL secure and out of your code, create a file named .env in the same directory. Paste your Webhook URL inside it like this:

```.env
DISCORD_WEBHOOK_URL="your_webhook_url_goes_here"
```
Important: If you're using Git, add the .env file to your .gitignore to prevent it from being committed.

## Step 4: Run and Test 🚀
Start the Monitor: Run the script from your terminal.
```
node monitor.js
```
You will see the message 🚀 Starting file monitor for 'server.js'.... The script is now running in the background, watching for changes.

Test It: Open your server.js file, make a small change (like adding a comment), and save it.
