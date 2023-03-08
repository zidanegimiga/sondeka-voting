const mongoose = require('mongoose');

const nomineeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  votes: { type: Number, default: 0 }
});

nomineeSchema.methods.incrementVotes = function() {
  this.votes++;
};

const Nominee = mongoose.model('Nominee', nomineeSchema);

module.exports = Nominee;