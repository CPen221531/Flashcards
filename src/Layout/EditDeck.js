import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';

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

  if (!deck) return <p>Loading...</p>;

  const handleNameChange = (event) => setDeck({ ...deck, name: event.target.value });
  const handleDescriptionChange = (event) => setDeck({ ...deck, description: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    navigate(`/decks/${deck.id}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={deck.name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={deck.description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">Save</button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
      </form>
    </div>
  );
};

export default EditDeck;