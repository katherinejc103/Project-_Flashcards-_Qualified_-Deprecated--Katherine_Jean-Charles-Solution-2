import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '.././utils/api';

export default function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const abortController = new AbortController();

  const initialCardState = {
    front: '',
    back: '',
  };

  const [currentDeck, setCurrentDeck] = useState({});
  const [newCard, setNewCard] = useState(initialCardState);

  useEffect(() => {
    async function loadDeck() {
      try {
        const deck = await readDeck(deckId);
        setCurrentDeck(deck);
      } catch (error) {
        console.error('Error loading deck:', error);
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  function handleChange(event) {
    setNewCard({
      ...newCard,
      [event.target.name]: event.target.value,
    });
  }

  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createCard(deckId, { ...newCard }, abortController.signal);
    if (Object.keys(response).length) {
      setNewCard(initialCardState);
      history.go(0);
    }
  }

  return (
    <main>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Add Card</li>
      </ol>
      <div className="row">
        <div className="card" style={{ width: '90%' }}>
          <div className="card-body">
            <h2 className="card-title">
              {currentDeck.name}: Add Card
            </h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="front" className="form-label">
                Front
              </label>
              <textarea
                rows="4"
                cols="50"
                name="front"
                value={newCard.front}
                placeholder="Front side of card"
                onChange={handleChange}
                className="form-control mb-2"
              ></textarea>
              <label htmlFor="back" className="form-label">
                Back
              </label>
              <textarea
                rows="4"
                cols="50"
                name="back"
                value={newCard.back}
                placeholder="Back side of card"
                onChange={handleChange}
                className="form-control mb-4"
              ></textarea>
              <button type="button" className="btn btn-secondary mr-3" onClick={handleCancel}>
                Done
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}