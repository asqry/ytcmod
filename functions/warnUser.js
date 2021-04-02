const { MessageEmbed } = require('discord.js');
const config = require('../config');
const models = require('../models');

module.exports = async (user, author, reason) => {
  let embed = new MessageEmbed()
    .setColor(config.red)
    .setDescription(`You were warned by ${author.user.tag}`)
    .addField('Reason | ', reason);

  let u = await models.user.findOne({ id: user.id });

  embed.addField('Strikes | ', u.strikes + 1 || 1);

  user
    .send(embed)
    .then()
    .catch(() => {
      console.log(`Couldn't DM ${user.user.tag}`);
    });
};
