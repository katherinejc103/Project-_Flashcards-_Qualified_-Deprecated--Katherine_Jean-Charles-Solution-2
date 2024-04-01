import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams, useHistory } from "react-router-dom";
import CardList from "./CardList";
import { readDeck, deleteDeck } from "../utils/api";

export default function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [currentDeck, setCurrentDeck] = useState({ cards: [] });

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(fetchedDeck);
      } catch (e) {
        console.error(e);
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleDelete = async (id) => {
    const deleteOnClick = window.confirm(
      "Are you sure you want to delete this deck? You will not be able to recover it."
    );
    if (deleteOnClick) {
      await deleteDeck(id);
      history.go(0);
    } else {
      history.go(0);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {currentDeck.name}
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h4>{currentDeck.name}</h4>
            <p className="card-text">{currentDeck.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
              Study
            </Link>
            <Link
              to={`/decks/${deckId}/cards/new`}
              className="btn btn-primary"
            >
              + Add Cards
            </Link>
            <button
              onClick={() => handleDelete(deckId)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3>Cards</h3>
        <CardList cards={currentDeck.cards} />
      </div>
    </div>
  );
}
