// src/TeamsList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TeamsList.css';  // Make sure to import the CSS file

function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/teams')
      .then(response => setTeams(response.data))
      .catch(error => setError('Error fetching teams'));
  }, []);

  return (
    <div className="teams-list">
      <h1>All Fantasy Teams</h1>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            <Link to={`/teams/${team._id}`}>
              <h2>{team.name}</h2>
              <p>Total Points: {team.totalPoints}</p>
            </Link>
            <ul>
              {team.players.map(player => (
                <li key={player._id}>
                  {player.name} - {player.position} - {player.points} points
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsList;
