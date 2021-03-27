const models = require('../models');

module.exports = async (id, tag) => {
  let user = await models.user.findOne({ id: id });

  if (!user || user == null) {
    let newUser = new models.user({
      id: id,
      tag: tag,
      strikes: null,
      messageCount: 1,
    });
    newUser.save();
  } else {
    user.messageCount += 1;
    user.save();
  }
};
