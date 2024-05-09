import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/decks')
      .then(response => {
        setDecks(response.data);
      })
      .catch(error => {
        console.error('Error fetching decks:', error);
      });
  }, []);

  const filteredDecks = decks.filter(deck =>
    deck.card_type.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by card type"
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
      <h1>Deck List <button><Link to="/create-deck">+</Link></button></h1> 
        {filteredDecks.map(deck => (
          <li key={deck.id}>
            <Link to={`/decks/${deck.id}`}>
              {deck.name} ({deck.card_type})
            </Link>
          </li>
        ))}
    </div>
  );
}

export default DeckList;