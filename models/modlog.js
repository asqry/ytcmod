const { Schema, model } = require('mongoose');

let data = new Schema({
  id: String,
  tag: String,
  proofURL: String,
  reason: String,
});

module.exports = new model('modlog', data);
