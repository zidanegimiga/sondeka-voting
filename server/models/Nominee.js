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
  categoryName: {
    type: String,
    required: true
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
    other: [{
      type: String,
      required: false,
    }]
  },
  submission: {
      type: String,
      required: true,
  },
  profilePicture: {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }

},
  votes: { type: Number, default: 0 }
});

nomineeSchema.methods.incrementVotes = function() {
  this.votes++;
};

const Nominee = mongoose.model('Nominee', nomineeSchema);

module.exports = Nominee;