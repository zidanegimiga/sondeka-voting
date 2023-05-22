const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voter',
    required: true
  },
  nominee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominee',
    required: true
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  categoryName:{
    type: String,
    ref: 'Category',
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