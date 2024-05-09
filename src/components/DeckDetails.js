import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';

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
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          {deck.name} - {deck.card_type}
        </Typography>
        <Grid container spacing={3}>
          {deck.cards.map(card => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={card.id}>
              <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                <CardMedia
                  component="img"
                  image={card.image_url}
                  alt={card.name}
                  sx={{ height: 300, objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {card.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {card.card_type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    HP: {card.hp}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Supertype: {card.supertype}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Level: {card.level ? card.level : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default DeckDetails;
