const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;