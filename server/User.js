const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    // unique: true,  // we might enforce that with an index
    required: true,
    lowercase: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email not valid',
    ],
    minlength: [6, 'Email address too short to be true'],
    maxlength: [100, 'Email address too long to be true'],
  },
  password: {
    required: true,
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
}, { timestamps: true, strict: true }
);


UserSchema.statics.validPassword = function (password) {
  if (password && password.length < 6) {
    return 'Password length must be greater than 6 characters'
  } else if (password && !/[A-Z]/.test(password)) {
    return 'Password must contain at least 1 capital letter'
  } else if (password && !/[0-9]/.test(password)) {
    return 'Password must contain at least 1 digit'
  } else if (password && !/[a-z]/.test(password)) {
    return 'Password must contain at least 1 lowercase letter'
  }
  else return true;
}
UserSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, 10);
};
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
