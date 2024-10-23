// models/team.js
const mongoose = require('mongoose');

// Team Schema
const teamSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  players: [
    { type: mongoose.Schema.Types.ObjectId,
    ref: 'Player' 
    }
  ],
  totalPoints: {
    type: Number,
    default: 0 
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
