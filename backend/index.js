const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/fantasy')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Player = require('./models/Player');
const Team = require('./models/Team');
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// route which shows all players
app.get("/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve players", error });
  }
});

// route for creating the team by selecting the players
app.post("/teams", async (req, res) => {
  try {
    const { name, players } = req.body;
    if (!name || players.length === 0) {
      return res.status(400).json({ message: "Invalid team data" });
    }

    const playerDetails = await Player.find({ '_id': { $in: players } });
    const totalPoints = playerDetails.reduce((acc, player) => acc + player.points, 0);
    const team = new Team({ name, players, totalPoints });
    await team.save();
    
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Failed to create team", error });
  }
});


// Retrieve the individual team with their specific id
app.get("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("players");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve team", error });
  }
});

// GET /teams - Retrieve all teams
app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find().populate("players"); // populate players to get details
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve teams", error });
  }
});



