import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import DeckList from './components/DeckList';
import DeckDetails from './components/DeckDetails';
import DeckForm from './components/DeckForm';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokémon Deck Builder
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/create-deck">
            Create Deck
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ bgcolor: '#f5f5f5', p: 4, borderRadius: 2, boxShadow: 1 }}>
          <Routes>
            <Route path="/decks/:id" element={<DeckDetails />} />
            <Route path="/decks" element={<DeckList />} />
            <Route path="/create-deck" element={<DeckForm />} />
            <Route path="/" exact element={<DeckList />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;