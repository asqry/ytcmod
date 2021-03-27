require('discord.js');

module.exports.attachCollector = async (message, filter) => {
  let collector = message.createReactionCollector(filter, { max: 1 });

  return collector;
};
