import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import ViewCard from "./ViewCard";

function StudyDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState("");

  useEffect(() => {
    // "deckId" dependency means this runs each time a new deck is selected
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      // calls "readDeck" api (promise)
      .then(setDeck);
    // sets deck state to the result of api promise

    return () => abortController.abort();
  }, [deckId]);

  if (deck) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <ViewCard deck={deck} />
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
}
export default StudyDeck;
