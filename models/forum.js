const mongoose = require('mongoose');
var ForumSchema = new mongoose.Schema({
  title: { type: String },
  forum_body: { type: String },
  doc: { type: Date },
  author: { type: String },
});
module.exports = mongoose.model('forum', ForumSchema);
