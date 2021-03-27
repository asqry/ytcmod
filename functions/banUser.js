const { MessageEmbed } = require('discord.js');
const config = require('../config');
const models = require('../models');

module.exports = async (user, author, reason) => {
  let embed = new MessageEmbed()
    .setColor(config.red)
    .setDescription(`You were banned by ${author.user.tag}`)
    .addField('Reason | ', reason + ' | Automatic ban - 3+ strikes');

  user
    .send(embed)
    .then()
    .catch(() => {
      console.log(`Couldn't DM ${user.user.tag}`);
    });

  await user.ban({ reason: reason });
};
