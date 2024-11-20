import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readCard, updateCard } from '../utils/api';
import FormComponent from './FormComponent';

const EditCard = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const fetchedCard = await readCard(cardId);
        setCard(fetchedCard);
      } catch (error) {
        console.error("Error loading card:", error);
      }
    };
    fetchCard();
  }, [cardId]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard(card);
      navigate(`/decks/${card.deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleCancel = () => navigate(`/decks/${card.deckId}`);

  if (!card) return <p>Loading...</p>;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href={`/decks/${card.deckId}`}>Deck {card.deckId}</a></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <FormComponent 
        card={card} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default EditCard;