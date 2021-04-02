let { MessageEmbed } = require('discord.js');
let models = require('../models');
let functions = require('../functions');
let config = require('../config');

module.exports = {
  name: 'modlogs',
  description: 'View a user\'s past punishments',
  execute: async (client, message, args) => {
     let target = message.mentions.members.first() || message.guild.member(args[0]);
     if(!target) return message.channel.send(functions.embeds.error(`User \`${target}\` not found`, message.member))

     let embed = functions.embeds.success(`${target}'s Modlogs`, message.member)

     let modlogs = await models.modlog.find({id: target.id})

     modlogs.forEach(log => {
         embed.addField(`${log.reason}`, `Moderator: ${log.moderator}\nRule: ${log.rule}\n[Proof](${log.proofURL})`, true)
     })

     message.channel.send(embed)
  }
}