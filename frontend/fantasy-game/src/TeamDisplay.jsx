// src/TeamDisplay.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TeamDisplay.css';  // Make sure to import the CSS file

function TeamDisplay() {
  const { id } = useParams();  // Extract team ID from the URL
  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/teams/${id}`)
      .then(response => setTeam(response.data))
      .catch(error => setError("Error fetching team details"));
  }, [id]);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="team-container">
      {team ? (
        <div>
          <h1>Team: {team.name}</h1>
          <p>Total Points: {team.totalPoints}</p>
          <ul>
            {team.players.map(player => (
              <li key={player._id}>
                {player.name} - {player.position} <span>{player.points} points</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="loading">Loading team details...</p>
      )}
    </div>
  );
}

export default TeamDisplay;
