let { messageStats } = require('../functions/index.js');
let config = require('../config');

module.exports = async (message, client) => {
  if (message.author.bot) return;
  let validGuild = client.guilds.cache.get(config.ytcID);
  if (message.guild.id !== validGuild.id) return;
  messageStats(message.author.id, message.author.tag);

  let args = message.content.slice('!'.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command);
  if (!cmd) return;
  cmd.execute(client, message, args);
};
