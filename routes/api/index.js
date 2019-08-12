const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/users', require('./users'));

module.exports = apiRouter;