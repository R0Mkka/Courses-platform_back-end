const express = require('express');
const User = require('./user.model');

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  User.find({}, (error, users) => {
    if (error) return console.error(error);

    res.send(users);
  });
});

module.exports = usersRouter;