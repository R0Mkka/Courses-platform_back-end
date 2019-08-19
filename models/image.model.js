const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  }
}, { versionKey: false });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;