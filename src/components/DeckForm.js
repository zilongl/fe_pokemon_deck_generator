import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  CircularProgress
} from '@mui/material';

function DeckForm() {
  const [name, setName] = useState('');
  const [cardType, setCardType] = useState('');
  const [availableTypes, setAvailableTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // fetch types from API https://api.pokemontcg.io/v2/types
  useEffect(() => {
    axios.get('https://api.pokemontcg.io/v2/types')
      .then(response => {
        setAvailableTypes(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching types:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDeck = { name, card_type: cardType };

    setLoading(true);
    axios.post('http://localhost:3000/decks', newDeck)
      .then((response) => {
        navigate(`/decks/${response.data.id}`);
      })
      .catch((error) => {
        console.error('Error creating deck:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <Typography variant="h5">Creating deck...</Typography> <Box sx={{ ml: 2 }}><CircularProgress /></Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  const isFormValid = name.trim() !== '' && cardType !== '';

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create New Deck
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Deck Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Card Type"
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="">Select a type</MenuItem>
            {availableTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isFormValid} // Disable the button if form is not valid
            >
              Create
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default DeckForm;