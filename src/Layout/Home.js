import React, { useEffect, useState } from 'react';
import { listDecks } from '../utils/api'; // Import the listDecks function to fetch data
import { Link } from 'react-router-dom';

const Home = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const fetchedDecks = await listDecks();
        setDecks(fetchedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };
    fetchDecks();
  }, []);

  if (!decks.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Deck List</h1>
      <Link to="/decks/new" className="btn btn-primary mb-3">Create Deck</Link>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id} className="deck-item">
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <p>{deck.cards.length} cards</p>
            <div>
              <Link to={`/decks/${deck.id}`} className="btn btn-primary mr-2">View</Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary mr-2">Study</Link>
              <button className="btn btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;