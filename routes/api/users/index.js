const express = require('express');
const bcrypt = require('bcrypt');

const User = require('./user.model');
const { errors } = require('./users.config');

const usersRouter = express.Router();

// GET: Get all users
usersRouter.get('/', (req, res) => {
  User.find({}, (error, users) => {
    if (error) return console.error(error);

    res.send(users);
  });
});

// POST: Register new user
usersRouter.post('/register', (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: errors.emptyBody });
  }

  const { firstName, lastName, email, password, role } = req.body;

  User.findOne({ email }, async (error, user) => {
    if (error) return console.error(error);

    if (!!user) {
      res.send({ error: errors.userExists });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
      }, (error, savedUser) => {
        if (error) return console.error(error);

        res.send(savedUser);
      });
    }
  });
});

// TODO: PUT: Edit existing user
usersRouter.put('/edit/:id', (req, res) => {
  res.send({ error: 'Not implemented yet.' });
});

// TODO: DELETE: Edit existing user
usersRouter.delete('/delete/:id', (req, res) => {
  res.send({ error: 'Not implemented yet.' });
});

module.exports = usersRouter;
