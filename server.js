if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const initPassport = require('./configs/passport.config');

const expressApp = express();
const PORT = process.env.PORT;
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

initPassport(passport);

expressApp.use(morgan('combined'));
expressApp.use(bodyParser.json());
expressApp.use(cors(corsOptions));

expressApp.use(require('./routes'));

mongoose.connect(process.env.COURSES_PLATFORM_DB_URL, { useNewUrlParser: true }, (error) => {
  if (error) return console.error(error);

  expressApp.listen(PORT, () =>
    console.log(`Server is listening | MongoDB connected | PORT=${PORT} | NODE_ENV=${process.env.NODE_ENV}`
  ));
});

process.on('SIGINT', () => {
  mongoose.disconnect();
  process.exit();
});
