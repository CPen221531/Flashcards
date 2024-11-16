import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Layout/Home';
import DeckDetail from './Layout/DeckDetail';
import EditDeck from './Layout/EditDeck';
import AddCard from './Layout/AddCard';
import EditCard from './Layout/EditCard';
import StudyDeck from './Layout/StudyDeck';
import CreateDeck from './Layout/CreateDeck';
import NotFound from './Layout/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/decks/new" element={<CreateDeck />} />
      <Route path="/decks/:deckId" element={<DeckDetail />} />
      <Route path="/decks/:deckId/edit" element={<EditDeck />} />
      <Route path="/decks/:deckId/study" element={<StudyDeck />} />
      <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
      <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;