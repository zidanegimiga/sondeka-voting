const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  nominees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominee',
  }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;