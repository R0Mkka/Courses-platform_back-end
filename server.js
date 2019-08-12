if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const expressApp = express();
const PORT = process.env.PORT;

expressApp.use(morgan('combined'));
expressApp.use(bodyParser.json());

expressApp.use(require('./routes'));

mongoose.connect(process.env.COURSES_PLATFORM_DB_URL, { useNewUrlParser: true }, (error) => {
  if (error) return console.error(error);

  expressApp.listen(PORT, () => console.log(`Server is listening on port: ${PORT}.`));
});

process.on('SIGINT', () => {
  mongoose.disconnect();
  process.exit();
});
