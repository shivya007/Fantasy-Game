import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PlayerSelectionForm.css';

function PlayerSelectionForm() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/players")
      .then(response => setPlayers(response.data))
      .catch(error => setError("Error fetching players"));
  }, []);

  const addPlayer = (player) => {
    if (selectedPlayers.some(p => p._id === player._id)) {
      setError("Player already selected");
      return;
    }

    if (selectedPlayers.length < 11) {
      setSelectedPlayers([...selectedPlayers, player]);
      setError("");
    } else {
      setError("You can only select up to 11 players");
    }
  };

  const createTeam = () => {
    if (!teamName.trim()) {
      setError("Please provide a team name");
      return;
    }
    
    if (selectedPlayers.length === 0) {
      setError("Please select at least one player");
      return;
    }

    axios.post("http://localhost:5000/teams", {
      name: teamName,
      players: selectedPlayers.map(p => p._id)
    })
    .then(response => {
      const createdTeam = response.data;
      setError("");
      navigate(`/teams/${createdTeam._id}`);  // Redirect to the team page
    })
    .catch(error => setError("Error creating team"));
  };

  return (
    <div className="team-form">
      <h1>Create Your Fantasy Team</h1>
      
      
      <h2>Available Players</h2>
      <ul className="player-list">
        {players.map(player => (
          <li key={player._id} className="player-item">
            {player.name} - {player.position} - {player.points} points
            <button onClick={() => addPlayer(player)} className="add-btn">Add to Team</button>
          </li>
        ))}
      </ul>

      <h2>Your Selected Players</h2>
      <ul className="selected-player-list">
        {selectedPlayers.map(player => (
          <li key={player._id}>{player.name} - {player.position}</li>
        ))}
      </ul>
      {error && <div className="error-message">{error}</div>}
      
      <input
        type="text"
        placeholder="Enter team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="team-input"
      />

      <button onClick={createTeam} className="create-btn">Create Team</button>
    </div>
  );
}

export default PlayerSelectionForm;
