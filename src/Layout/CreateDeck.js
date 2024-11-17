import React from 'react';
import { createDeck } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import DeckForm from './DeckForm'; // Import the new DeckForm component

const CreateDeck = () => {
  const navigate = useNavigate();

  const handleSubmit = async (deck) => {
    try {
      const createdDeck = await createDeck(deck);
      navigate(`/decks/${createdDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  const handleCancel = () => navigate('/');

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <DeckForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default CreateDeck;