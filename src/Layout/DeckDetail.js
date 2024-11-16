import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../utils/api';

const DeckDetail = () => {
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

  const handleDeleteDeck = async () => {
    if (window.confirm("Are you sure you want to delete this deck? This action cannot be undone.")) {
      await deleteDeck(deckId);
      navigate('/');
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card? This action cannot be undone.")) {
      await deleteCard(cardId);
      setDeck({ ...deck, cards: deck.cards.filter((card) => card.id !== cardId) });
    }
  };

  if (!deck) return <p>Loading...</p>;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className="mb-3">
        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">Edit</Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">Study</Link>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mr-2">Add Cards</Link>
        <button className="btn btn-danger" onClick={handleDeleteDeck}>Delete</button>
      </div>
      <h3>Cards</h3>
      {deck.cards && deck.cards.length ? (
        <ul className="list-group">
          {deck.cards.map((card) => (
            <li key={card.id} className="list-group-item">
              <p><strong>Front:</strong> {card.front}</p>
              <p><strong>Back:</strong> {card.back}</p>
              <div className="mt-2">
                <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cards available.</p>
      )}
    </div>
  );
};

export default DeckDetail;