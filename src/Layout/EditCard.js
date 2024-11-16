import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';

const EditCard = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: '', back: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeckAndCard = async () => {
      try {
        const fetchedDeck = await readDeck(deckId);
        const fetchedCard = await readCard(cardId);
        setDeck(fetchedDeck);
        setCard(fetchedCard);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchDeckAndCard();
  }, [deckId, cardId]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    navigate(`/decks/${deckId}`);
  };

  if (!deck || !card) return <p>Loading...</p>;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            value={card.front}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            value={card.back}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">Save</button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
      </form>
    </div>
  );
};

export default EditCard;