const { MessageEmbed } = require('discord.js');

let red = '#bd6868';
let green = '#69bd68';

module.exports.error = (err, member) => {
  let embed = new MessageEmbed()
    .setColor(red)
    .setAuthor(`An error occurred`, member.user.displayAvatarURL())
    .setDescription(err);

  return embed;
};

module.exports.success = (message, member) => {
  let embed = new MessageEmbed()
    .setColor(green)
    .setAuthor(`Success!`, member.user.displayAvatarURL())
    .setDescription(message);

  return embed;
};
