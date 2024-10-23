const mongoose = require("mongoose");
const Player = require("/models/player.js");  // Import the Player model

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/fantasy')
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Define cricket players data to seed
const players = [
  { name: 'Virat Kohli', position: 'Batsman', points: 90 },
  { name: 'Rohit Sharma', position: 'Batsman', points: 85 },
  { name: 'Jasprit Bumrah', position: 'Bowler', points: 88 },
  { name: 'MS Dhoni', position: 'Wicketkeeper', points: 92 },
  { name: 'Hardik Pandya', position: 'All-Rounder', points: 86 },
  { name: 'Ravindra Jadeja', position: 'All-Rounder', points: 84 },
  { name: 'KL Rahul', position: 'Batsman', points: 81 },
  { name: 'Rishabh Pant', position: 'Wicketkeeper', points: 83 },
  { name: 'Shikhar Dhawan', position: 'Batsman', points: 80 },
  { name: 'Yuzvendra Chahal', position: 'Bowler', points: 79 },
  { name: 'Bhuvneshwar Kumar', position: 'Bowler', points: 77 },
  { name: 'Shreyas Iyer', position: 'Batsman', points: 78 },
  { name: 'Suryakumar Yadav', position: 'Batsman', points: 76 },
  { name: 'Kuldeep Yadav', position: 'Bowler', points: 75 },
  { name: 'Mohammed Shami', position: 'Bowler', points: 82 },
  { name: 'Ishan Kishan', position: 'Wicketkeeper', points: 74 },
  { name: 'Deepak Chahar', position: 'Bowler', points: 73 },
  { name: 'Axar Patel', position: 'All-Rounder', points: 80 },
  { name: 'Shardul Thakur', position: 'Bowler', points: 76 },
  { name: 'Washington Sundar', position: 'All-Rounder', points: 78 }
];


// Insert players into the database
Player.insertMany(players)
  .then(() => {
    console.log('Players data seeded successfully');
  })
  .catch(err => {
    console.error('Error seeding players:', err);
  });
