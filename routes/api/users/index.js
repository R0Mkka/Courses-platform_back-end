const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('express-jwt');

const Image = require('../../../models/image.model');
const User = require('../../../models/user.model');
const { errors } = require('./users.config');

const usersRouter = express.Router();

// GET: Get all users
usersRouter.get('/', (req, res) => {
  User.find({}, (error, users) => {
    if (error) return console.error(error);

    res.status(200).send(users);
  });
});

// GET: Get current user
usersRouter.get('/current', jwt({ secret: process.env.SECRET }), (req, res) => {
  if (!req.user._id) {
    return res.status(401).send({ error: 'UnauthorizedError: private profile' });
  }

  User.findById(req.user._id).exec((error, user) => {
    if (error) return console.error(error);

    res.status(200).send(user);
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
      const newUser = new User();

      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.role = role;
      newUser.courses = [];
      newUser.registrationDate = new Date();

      newUser.save((error) => {
        if (error) return console.error(error);

        const token = newUser.generateJWT();

        res.status(200).send({ token });
      });
    }
  });
});

// POST: Login user
usersRouter.post('/login', (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(404).send({ error });

    if (!!user) {
      const token = user.generateJWT();

      return res.status(200).send({ token });
    }

    return res.status(401).send({ error: info });
  })(req, res);
});

// TODO: PUT: Edit existing user
usersRouter.put('/edit/:id', jwt({ secret: process.env.SECRET }), (req, res) => {
  const id = req.params.id;
  const newUser = req.body;

  console.log(newUser);

  if (!!id && !!newUser) {
    return User.findOneAndUpdate(
      { _id: id },
      { $set: { ...newUser } },
      { new: true },
      (error, changedUser) => {
        if (error) return console.error(error);
  
        res.status(200).send(changedUser);
      });
  }

  res.send(200).send({ error: 'Not found' });
});

// TODO: DELETE: Delete existing user
usersRouter.delete('/delete/:id', (req, res) => {
  res.send({ error: 'Not implemented yet.' });
});

usersRouter.get(
  '/kek',
  (req, res) => {
    Image.find({}, (error, images) => {
      res.status(200).send(images);
    });
  }
);

usersRouter.post(
  '/kek',
  (req, res) => {
    for (const prop of Object.keys(req.body)) {
      console.log(prop);
    }

    const image = new Image();

    image.name = req.body.name;
    image.content = req.body.content;
    image.type = req.body.type;

    image.save();

    res.send({ kek: 'kek' });
  }
);

module.exports = usersRouter;
