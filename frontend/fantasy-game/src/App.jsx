
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerSelectionForm from './PlayerSelectionForm';
import TeamDisplay from './TeamDisplay';
import TeamsList from './TeamsList';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/players" element={<PlayerSelectionForm />} />
        <Route path="/" element={<PlayerSelectionForm />} />
        <Route path="/teams/:id" element={<TeamDisplay />} />
        <Route path="/teams" element={<TeamsList />} />
      </Routes>
    </Router>
  );
}

export default App
