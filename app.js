require("dotenv").config();
const createError = require('http-errors');
let express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const userRouter = require('./routes/User');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
  console.log('using prod');
} else {
  app.use('/', express.static(path.join(__dirname, 'public')));
  console.log('using dev');
}



app.use('/user', userRouter);

// Define all API routes before this runs
// Send every request to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://admin:g0atf4c3@ds347665.mlab.com:47665/heroku_bw7fbnmz",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to mongoDB: mernAuthDB');
  });

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

module.exports = app;
