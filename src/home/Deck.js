import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { readDeck } from ".././utils/api";

export default function Deck() {
  const { deckId } = useParams();
  const history= useHistory()

  const [currentDeck, setCurrentDeck] = useState({});
  const abortController = new AbortController();
  useEffect(() => {
    async function loadDeck() {
      //  const abortController = new AbortController();
      try {
        const deck = await readDeck(deckId);
        setCurrentDeck(deck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  function handleClick(event) {
    setCurrentDeck({
      ...currentDeck,
      [event.target.name]: event.target.value,
    });
  }
  function handleClick(event) {
    // Handle different button clicks here
    switch (event.target.name) {
      case "Edit": history.push(`/decks/${deckId}/edit`);
        break;
      case "Study": history.push(`/decks/${deckId}/study`);
        break;
      case "Add Cards": history.push(`/decks/${deckId}/cards/new`);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
            React Router
            </li>
          </ol>
        </nav>
        
      {/* <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">React Router</li>
      </ol> */}
      <div>
        <h4>{currentDeck.name}</h4>
        <p>{currentDeck.description}</p>
        <button name="Edit" onClick={handleClick}>
          Edit
        </button>
        <button name="Study" onClick={handleClick}>
          Study
        </button>
        <button name="Add Cards" onClick={handleClick}>
          Add Cards
        </button>
      </div>
    </div>
  );
}
