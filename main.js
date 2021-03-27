const { Client, Collection } = require('discord.js');
require('dotenv/config');
const events = require('./events');

const client = new Client({
  partials: ['REACTION', 'MESSAGE', 'GUILD_MEMBER', 'USER', 'CHANNEL'],
});

client.commands = new Collection();

client.on('ready', () => events.ready(client));

client.on('message', (message) => events.message(message, client));

client.login(process.env.TOKEN);
