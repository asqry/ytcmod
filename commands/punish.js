let { MessageEmbed } = require('discord.js');
let models = require('../models');
let functions = require('../functions');
let config = require('../config');

module.exports = {
  name: 'punish',
  description: 'Punish a user.',
  execute: async (client, message, args) => {
    let validReactions = config.rules
    let target =
      message.mentions.members.first() || message.guild.member(args[0]);
    let user =
      message.mentions.members.first() || message.guild.member(args[0]);
    if (!user) {
      message.channel.send(
        functions.embeds.error(`User \`${args[0]}\` not found`, message.member)
      );
      return;
    }

    let embed = new MessageEmbed()
      .setColor(config.yellow)
      .setAuthor(message.author.tag, message.author.displayAvatarURL());

    validReactions.forEach((reaction) => {
      embed.addField(`${reaction.emoji} | `, `${reaction.reason}`);
    });

    let msg = await message.channel.send(embed);

    validReactions.forEach(async (reaction) => {
      msg.react(reaction.emoji);
    });

    let col = await functions.reactionCollector.attachCollector(
      msg,
      (reaction, user) =>
        !user.bot &&
        validReactions.find((r) => r.emoji === reaction.emoji.name) &&
        message.author.id === user.id
    );

    col.on('collect', async (reaction, user) => {
      reaction.message.reactions
        .resolve(reaction.emoji.name)
        .users.remove(user.id);

      let r = await validReactions.find((r) => r.emoji === reaction.emoji.name);

      if (!r) return;

      embed.setDescription(
        'Please select the type of proof you will be submitting for this punishment:\n\n**' +
          r.reason +
          '**'
      );
      embed.fields = [];
      let reactions = [
        { emoji: '1️⃣', type: 'Attachment (.png, .jpg, .mp4)' },
        // { emoji: '2️⃣', type: 'Message (Message ID)' },
        { emoji: '2️⃣', type: 'No Proof' },
      ];
      reactions.forEach(async (re) => {
        embed.addField(re.emoji + ' | ', re.type, true);
      });
      let m = await reaction.message.channel.send(embed);
      reactions.forEach(async (re) => {
        m.react(re.emoji);
      });

      var col2 = await functions.reactionCollector.attachCollector(
        m,
        (reaction, user) =>
          !user.bot &&
          reactions.find((re) => re.emoji === reaction.emoji.name) &&
          message.author.id === user.id
      );
      col2.on('collect', async (reaction, user) => {
        reaction.message.reactions
          .resolve(reaction.emoji.name)
          .users.remove(user.id);

        let re = await reactions.find((re) => re.emoji === reaction.emoji.name);

        if (!re) return;

        if (re.emoji === '1️⃣') {
          embed.fields = [];
          embed.setDescription(
            `Please provide your proof of \`${r.reason}\` in the form of \`${re.type}\` by copy/pasting your proof in this channel.`
          );

          let colMsg = await reaction.message.channel.send(embed);

          let msgCol = await colMsg.channel.awaitMessages(
            (mes) => !mes.author.bot && mes.author.id === user.id,
            { max: 1 }
          );

          let finalMsg = msgCol.first();

          let arr = finalMsg.attachments.array().map((r) => r.url);

          if (!arr[0])
            return finalMsg.channel.send(
              await functions.embeds.error(
                `Invalid attachment, process restart is necessary.`,
                finalMsg.member
              )
            );
          arr.forEach((i) => embed.setImage(i));
          arr.forEach((i) => embed.setURL(i));
          embed.fields = [];
          embed.setDescription('Your uploaded proof:');

          finalMsg.channel.send(embed);

          let newLog = new models.modlog({
            id: target.user.id,
            tag: target.user.tag,
            proofURL: arr[0],
            reason: r.reason,
            moderator: message.author.tag,
            rule: r.emoji
          });

          newLog.save().then(async (doc) => {
            let u = await models.user.findOne({ id: doc.id });
            if (u === null) {
              let newUser = new models.user({
                id: target.id,
                tag: target.user.tag,
                strikes: r.points,
                messageCount: 0,
              });
              newUser.save().then((doc2) => {
                if (doc2.strikes >= 3) {
                  //ban logic
                  console.log('ban');
                }
              });
              return;
            }
            u.strikes = u.strikes + r.points;
            u.save().then((doc2) => {
              if (doc2.strikes >= 3) {
                functions.banUser(target, message.guild.member(user), r.reason);
              }
            });

            await reaction.message.channel.send(
              functions.embeds.success(
                `Successfully logged the punishment.`,
                reaction.message.guild.member(user)
              )
            );
          });
          functions.warnUser(target, message.guild.member(user), r.reason);
        } else if (reaction.emoji.name === '2️⃣') {

          
          

              //-
              let newLog = new models.modlog({
                id: target.user.id,
                tag: target.user.tag,
                proofURL: 'https://i.imgur.com/djHc5Cm.png',
                reason: r.reason,
                moderator: message.author.tag,
                rule: r.emoji,
              });

              newLog.save().then(async (doc) => {
                let u = await models.user.findOne({ id: doc.id });
                if (u === null) {
                  let newUser = new models.user({
                    id: target.id,
                    tag: target.user.tag,
                    strikes: r.points,
                    messageCount: 0,
                  });
                  newUser.save().then((doc2) => {
                    if (doc2.strikes >= 3) {
                      //ban logic
                      console.log('ban');
                    }
                  });
                  return;
                }
                u.strikes = u.strikes + r.points;
                u.save().then((doc2) => {
                  if (doc2.strikes >= 3) {
                    functions.banUser(
                      target,
                      message.guild.member(user),
                      r.reason
                    );
                  }
                });

                await reaction.message.channel.send(
                  functions.embeds.success(
                    `Your punishment has been logged, next time please collect proof in the form of a screenshot or video proof.`,
                    reaction.message.guild.member(user)
                  )
                );
              });
              //-

          functions.warnUser(target, message.guild.member(user), r.reason);
        }
      });
    });
  },
};
