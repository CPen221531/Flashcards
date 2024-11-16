import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';

const AddCard = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    };
    fetchDeck();
  }, [deckId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, { front, back });
    setFront('');
    setBack('');
  };

  const handleDone = () => navigate(`/decks/${deckId}`);

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            className="form-control"
            value={front}
            onChange={handleFrontChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            className="form-control"
            value={back}
            onChange={handleBackChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={handleDone}>Done</button>
      </form>
    </div>
  );
};

export default AddCard;