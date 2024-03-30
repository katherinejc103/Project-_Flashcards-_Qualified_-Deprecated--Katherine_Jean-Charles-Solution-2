import React, { useState, useEffect } from "react";
import { readDeck } from ".././utils/api";
import { Link, useHistory, useParams } from "react-router-dom";

export default function EditDeck() {
  const { deckId } = useParams();
  const abortController = new AbortController();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [currentDeck, setCurrentDeck] = useState({});

  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      //  const abortController = new AbortController();
      try {
        const deck = await readDeck(deckId);
        setCurrentDeck(deck);
        setFormData({
          ...formData,
          name: deck.name,
          description: deck.description,
        });
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">React Router / Edit Deck</li>
      </ol>
      <h4>Create Deck</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder={currentDeck.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          rows="4"
          cols="50"
          name="description"
          value={formData.description}
          placeholder={currentDeck.description}
          onChange={handleChange}
        />
        <br />
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
