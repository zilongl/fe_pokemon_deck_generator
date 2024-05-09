import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeckForm() {
  const [name, setName] = useState('');
  const [cardType, setCardType] = useState('');
  const [availableTypes, setAvailableTypes] = useState([]);
  const navigate = useNavigate();

  // fetch types from API https://api.pokemontcg.io/v2/types
  useEffect(() => {
    axios.get('https://api.pokemontcg.io/v2/types')
      .then(response => {
        console.log(response.data.data);
        setAvailableTypes(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching types:', error);
      });
  }, []);


  const handleSubmit = event => {
    event.preventDefault();
    const newDeck = { name: name, card_type: cardType };

    axios.post('http://localhost:3000/decks', newDeck)
      .then(response => {
        navigate(`/decks/${response.data.id}`);
      })
      .catch(error => {
        console.error('Error creating deck:', error);
      });
  };

  console.log(availableTypes)

  return (
    <div>
      <h1>Create New Deck</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Deck Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Card Type:
          <select value={cardType} onChange={e => setCardType(e.target.value)}>
            <option value="">Select a type</option>
            {availableTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default DeckForm;
