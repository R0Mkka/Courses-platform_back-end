const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const roles = ['Admin', 'Teacher', 'Student'];

const userSchema = new Schema({
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
  courses: {
    type: Array,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: roles
  },
  registrationDate: {
      type: Date,
      required: true
  }
}, { versionKey: false });

userSchema.methods.generateJWT = function() {
  const expiry = new Date();

  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.SECRET);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
