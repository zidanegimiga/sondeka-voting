const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voter',
    required: true
  },
  nominee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominee',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;