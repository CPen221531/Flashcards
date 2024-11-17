import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';
import DeckForm from './DeckForm';

const EditDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };
    fetchDeck();
  }, [deckId]);

  const handleSubmit = async (updatedDeck) => {
    try {
      const deckToUpdate = { ...deck, ...updatedDeck };
      await updateDeck(deckToUpdate);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  };

  const handleCancel = () => navigate(`/decks/${deckId}`);

  if (!deck) return <p>Loading...</p>;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <DeckForm
        initialName={deck.name}
        initialDescription={deck.description}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditDeck;