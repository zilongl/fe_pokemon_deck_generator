import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DeckDetails() {
  const { id } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/decks/${id}`)
      .then(response => {
        setDeck(response.data);
      })
      .catch(error => {
        console.error('Error fetching deck:', error);
      });
  }, [id]);

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{deck.name} - {deck.card_type}</h1>
      <ul>
        {deck.cards.map(card => (
          <li key={card.id}>
            <img src={card.image_url} alt={card.name} />
            <p>{card.name}</p>
            <p>{card.type}</p>
            <p>Level: {card.level}</p>
            <p>HP: {card.hp}</p>
            <p>{card.subtype}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeckDetails;
