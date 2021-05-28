let { MessageEmbed } = require('discord.js');
let config = require('../config');

module.exports = {
  name: 'help',
  description: 'See commands.',
  execute: async (client, message, args) => {
    let embed = new MessageEmbed()
    .setColor(config.yellow)
    .setAuthor(message.author.tag, message.author.displayAvatarURL()) 

    let desc = ""

    client.commands.forEach(cmd => {
        desc+=`${cmd.name}\n`
    })

    embed.setDescription(desc)

    await message.channel.send(embed)
  }
}