const express = require('express');
const session = require('express-session');

const adminMiddleware = () => {
  const middleware = express.Router();

  middleware.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

  return middleware;
};

module.exports = adminMiddleware;