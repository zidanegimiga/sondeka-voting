const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  name: {
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
  }
});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;