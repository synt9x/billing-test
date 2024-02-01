require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { PORT } = process.env;

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));

const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const sessionConfig = {
  name: 'tabletest',
  store: new FileStore(),
  secret: process.env.SECRET_KEY_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(expressSession(sessionConfig));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log('Server started on port: ', PORT);
});

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/users'));
