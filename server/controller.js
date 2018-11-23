
const { verifyToken, generateToken } = require('./token')
const User = require('./User')

function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      name: 'Bad Request',
      message: 'Email and password required'
    })
  }
  User
    .findOne({ email, active: true })
    .then(usr => {
      if (!usr) {
        return res.status(401).json({
          name: 'Unauthorized',
          message: 'Email or/and password not valid'
        })
      }
      if (!usr.validPassword(password)) {
        return res.status(401).json({
          name: 'Unauthorized',
          message: 'Email or/and password not valid'
        })
      }
      return res.json({
        // we do not send the encrypted password
        user: {
          _id: usr._id,
          email: usr.email,
        },
        token: generateToken(usr),
      })
    })
    .catch(err => {
      res.status(500).json({
        name: err.name,
        message: err.message,
      })
    })
}

function signup(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      name: 'Bad Request',
      message: 'Email and password required'
    })
  }
  const isValid = User.validPassword(password)
  if (isValid !== true) {
    return res.status(400).json({
      name: 'Bad Request',
      message: isValid,
    })
  }
  User
    .create({
      email: email.toLowerCase().trim(),
      password: User.generateHash(password),
    })
    .then(usr => {
      return res.json({
        // we do not send the encrypted password
        user: {
          _id: usr._id,
          email: usr.email,
        },
        token: generateToken(usr),
      })
    })
    .catch(err => {
      res.status(500).json({
        name: err.name,
        message: err.message,
      })
    })
}
function verify(req, res) {
  const { token } = req.body
  if (!token) {
    return res.status(400).json({
      name: 'Bad Request',
      message: 'token required'
    })
  }
  verifyToken(token)
    .then(usr => {
      // never expired
      return res.json({
        // we do not send the encrypted password
        user: {
          _id: usr._id,
          email: usr.email,
        },
        token: generateToken(usr),
      })
    })
    .catch(err => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(401).json({ message: 'Session expired, please log in again' });
        }
        else {
          res.status(500).json({
            name: err.name,
            message: err.message,
          })
        }
      }
    })
}

module.exports = {
  login,
  signup,
  verify,
}
