import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from ".././utils/api";
import { Link, useHistory, useParams } from "react-router-dom";

export default function EditDeck() {
  const { deckId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [currentDeck, setCurrentDeck] = useState({});

  const history = useHistory();
  const abortController = new AbortController();
  useEffect(() => {
    async function loadDeck() {
      
      try {
        const deck = await readDeck(deckId);
        // const abortController = new AbortController();
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

  async function handleSubmit(event) {
    event.preventDefault();
    // const abortController = new AbortController();

    const response = await updateDeck(...currentDeck, formData)
    history.push(`/decks/${deckId}`)
    return response
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
        <br />
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
