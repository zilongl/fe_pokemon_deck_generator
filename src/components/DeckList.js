import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Paper,
} from '@mui/material';

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
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Decks
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create-deck"
            sx = {{ ml: 2, minWidth: 0}}
          >
            +
          </Button>
        </Typography>
        <TextField
          label="Filter by card type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
          margin="normal"
        />
        <List>
          {filteredDecks.map((deck) => (
            <ListItem
              button
              component={Link}
              to={`/decks/${deck.id}`}
              key={deck.id}
            >
              <ListItemText primary={`${deck.name} (${deck.card_type})`} />
            </ListItem>
          ))}
        </List>

      </Paper>
    </Container>
  );
}

export default DeckList;