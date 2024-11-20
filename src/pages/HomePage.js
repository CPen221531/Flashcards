import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/decks/new" className="btn btn-primary">Create New Deck</Link>
      {/* Render other components or content */}
    </div>
  );
};

export default HomePage;