const mongoose = require('mongoose');

const nomineeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  stageName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  socialMedia: {
    instagram: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
  },
  submission: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  votes: { type: Number, default: 0 }
});

nomineeSchema.methods.incrementVotes = function() {
  this.votes++;
};

const Nominee = mongoose.model('Nominee', nomineeSchema);

module.exports = Nominee;