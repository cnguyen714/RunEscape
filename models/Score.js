const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  value: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: false
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
});

module.exports = Score = mongoose.model('Score', ScoreSchema, 'scores');