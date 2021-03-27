const { Schema, model } = require('mongoose');

let data = new Schema({
  id: String,
  tag: String,
  strikes: Number,
  messageCount: Number,
});

module.exports = new model('user', data);
