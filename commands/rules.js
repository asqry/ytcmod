let { MessageEmbed } = require('discord.js');
let config = require('../config');

module.exports = {
  name: 'rules',
  description: 'See the rule list and how many strikes you will get with a punishment.',
  execute: async (client, message, args) => {
    let embed = new MessageEmbed()
    .setColor(config.yellow)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())

    config.rules.forEach(rule => {
        embed.addField(rule.emoji, rule.reason + ` ***(${rule.points})***`, true)
    })

    await message.channel.send(embed)
  }
}