const jwt = require('jsonwebtoken');
const db = require('./db')

const JWT_SECRET = '3#2fK6V=aFJMFhq+'

function generateToken(user) {
  // 1. Dont use password and other sensitive fields
  // 2. Use fields that are useful in other parts of the
  // app/collections/models
  const u = {
    id: user.id.toString(),
    email: user.email,
  };
  let expiresIn = 60 * 60 * 24 * 7; // 7 days
  if (process.env.NODE_ENV !== 'production') {
    expiresIn *= 4; // 28 days
  }
  return jwt.sign(u, JWT_SECRET, {
    expiresIn,
  });
}

function verifyToken(token, next) {
  // Check token that was passed by decoding token using secret
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      next(err, null);
    } else {
      
    }
  });
}

module.exports = {
  verifyToken,
  generateToken,
}
