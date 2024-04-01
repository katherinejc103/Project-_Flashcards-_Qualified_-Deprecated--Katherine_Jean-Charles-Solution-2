import React, { useState, useEffect } from "react";
import { readDeck, readCard } from ".././utils/api";
import { Link, useHistory, useParams } from "react-router-dom";

export default function EditCard() {
  const { deckId, cardId } = useParams();

  const history = useHistory();

  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    async function loadCard() {
      try {
        const card = await readCard(cardId);
        setFormData({
          front: card.front,
          back: card.back,
        });
      } catch (error) {
        console.error("Error loading card:", error);
      }
    }
    loadCard();
  }, [cardId]);

  function handleChange(e) {
    setFormData(e.target.value);
  }

  function handleClick() {
    history.push(`/decks/${deckId}`);
  }
  function handleSubmit(event) {
    event.preventDefault();

    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">Deck React Router/Edit Card </li>
      </ol>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <textarea
          rows="4"
          cols="50"
          name="front"
          value={formData.front}
          placeholder="Front side of card"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="back">Back</label>
        <textarea
          rows="4"
          cols="50"
          name="back"
          value={formData.back}
          placeholder="Back side of card"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save</button>
        <button onClick={handleClick}>Done</button>
      </form>
    </div>
  );
}
