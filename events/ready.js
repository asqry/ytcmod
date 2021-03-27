let functions = require('../functions');
let { Schema } = require('mongoose');

module.exports = (client) => {
  functions.mongoConnect();
  functions.commandHandler(client.commands);

  console.log(`Logged in - ${client.user.tag}`);
};
