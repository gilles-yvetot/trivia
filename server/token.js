const jwt = require('jsonwebtoken');
const User = require('./User')

const JWT_SECRET = '3#2fK6V=aFJMFhq+'

function generateToken(user) {
  // 1. Dont use password and other sensitive fields
  // 2. Use fields that are useful in other parts of the
  // app/collections/models

  const u = {
    _id: user._id.toString(),
    email: user.email,
  };
  let expiresIn = 60 * 60 * 24 * 7; // 7 days
  if (process.env.NODE_ENV !== 'production') {
    expiresIn *= 4; // 28 days;
  }
  return jwt.sign(u, JWT_SECRET, {
    expiresIn,
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    // Check token that was passed by decoding token using secret
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        reject(err)
      } else {
        User.findOne({ _id: user._id, active: true })
          .then(usr => {
            resolve(usr)
          })
      }
    });
  })

}

module.exports = {
  verifyToken,
  generateToken,
  JWT_SECRET,
}
