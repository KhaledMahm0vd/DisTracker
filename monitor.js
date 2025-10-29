const fs = require('fs');
const axios = require('axios');
const diff = require('diff');
require('dotenv').config();

// --- CONFIGURATION ---
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const fileToWatch = 'server.js'; // The file you want to monitor
// --------------------

// Check if the webhook URL is provided
if (!DISCORD_WEBHOOK_URL) {
    console.error('Error: Please provide the DISCORD_WEBHOOK_URL in your .env file.');
    process.exit(1);
}

// Read the initial content of the file to have a starting point
let previousContent = fs.readFileSync(fileToWatch, 'utf8');

console.log(`🚀 Monitoring '${fileToWatch}' for changes...`);

// Watch the file for any modifications
fs.watch(fileToWatch, (eventType, filename) => {
    if (filename && eventType === 'change') {
        // Read the new, current content of the file
        const currentContent = fs.readFileSync(fileToWatch, 'utf8');

        // If content is identical (e.g., saving without changing), do nothing
        if (currentContent === previousContent) {
            return;
        }

        console.log(`[${new Date().toLocaleString()}] Change detected in '${filename}'.`);

        // Create a diff patch
        // The 'undefined' arguments are for optional headers we don't need
        const patch = diff.createPatch(filename, previousContent, currentContent, undefined, undefined, { context: 2 });

        // Format the patch for a Discord 'diff' code block
        // We also truncate it to avoid exceeding Discord's message length limit
        let diffForDiscord = '```diff\n' + patch + '\n```';
        if (diffForDiscord.length > 1900) {
            diffForDiscord = diffForDiscord.substring(0, 1900) + "\n... [Diff Truncated]```";
        }

        // Prepare a rich embed message for Discord
        const embedMessage = {
            content: `🚨 **File Change Alert!**`, // Main message content outside the embed
            embeds: [{
                title: `Changes in \`${filename}\``,
                description: diffForDiscord,
                color: 16734296, // A nice red-orange color
                timestamp: new Date().toISOString()
            }]
        };

        // Send the notification to Discord
        axios.post(DISCORD_WEBHOOK_URL, embedMessage)
        .then(() => {
            console.log('✅ Diff notification sent to Discord.');
        })
        .catch((error) => {
            console.error('❌ Error sending notification:', error.message);
        });

        // IMPORTANT: Update previousContent for the next change detection
        previousContent = currentContent;
    }
});
