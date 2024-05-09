import './App.css';
import DeckList from './components/DeckList';
import DeckDetails from './components/DeckDetails';
import DeckForm from './components/DeckForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <h1>Pokemon Deck Builder</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-deck">Create Deck</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/decks/:id" element={<DeckDetails />} />
          <Route path="/decks" element={<DeckList />} />
          <Route path="/create-deck" element={<DeckForm />} />
          <Route path="/" exact element={<DeckList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
