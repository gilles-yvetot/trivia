
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ResultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: String,
    required: true,
  },
  user_answer: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  incorrect_answers: [{
    type: String,
    required: true,
  }]
  // we could store these next 3 commented values as well but not very useful
  // category: {
  //   type: String,
  //   required: true,
  //   enum: []
  // },
  // type: {
  //   type: String,
  //   required: true,
  //   enum: ['multiple']
  // },
  // difficulty: {
  //   type: String,
  //   required: true,
  //   enum: ['easy', 'medium', 'hard']
  // },

}, { timestamps: true, strict: true }
);
const Result = mongoose.model('Result', ResultSchema);
module.exports = Result;
