import React, { useState } from 'react';

const DeckForm = ({ initialName = '', initialDescription = '', onSubmit, onCancel }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Deck Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-control"
          placeholder="Brief description of the deck"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default DeckForm;