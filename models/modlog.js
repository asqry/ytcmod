const { Schema, model } = require('mongoose');

let data = new Schema({
  id: String,
  tag: String,
  proofURL: String,
  reason: String,
  rule: String,
  moderator: String
});

module.exports = new model('modlog', data);
