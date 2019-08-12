const mongoose = require('mongoose');
const { Schema } = mongoose;

const roles = ['Admin', 'Teacher', 'Student'];

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
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: roles
  }
}, { versionKey: false });

const User = mongoose.model('User', userScheme);

module.exports = User;