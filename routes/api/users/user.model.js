const mongoose = require('mongoose');
const { Schema } = mongoose;

const userScheme = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 25
  },
  email: {
    type: String,
    required: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 30
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Teacher', 'Student']
  }
}, { versionKey: false });

const User = mongoose.model('User', userScheme);

module.exports = User;