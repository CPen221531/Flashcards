import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createDeck } from '../utils/api';

const CreateDeck = () => {
  const [deck, setDeck] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDeck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={deck.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={deck.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateDeck;