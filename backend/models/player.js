// models/player.js
const mongoose = require('mongoose');

// Player Schema
const playerSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  },
  position: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
