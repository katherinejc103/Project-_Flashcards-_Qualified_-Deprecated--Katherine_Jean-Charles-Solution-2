import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams} from "react-router-dom"
import {createCard, readDeck} from ".././utils/api"

export default function AddCard() {
  
  const { deckId } = useParams();
  const history = useHistory();
  const abortController = new AbortController();
  
  const [currentDeck, setCurrentDeck] = useState({});
  const [newCard, setNewCard] = useState(initialCardState)
  
  
  const initialCardState = {
    front: "",
    back: "",
  };
  
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
          abortController.abort()
        };
    }, [deckId])
  
  
  
  function handleChange(event) {
    setNewCard({
      ...newCard,
      [event.target.name]: event.target.value,
    });
  }
  
  function handleCancel(){
    history.push(`/decks/${deckId}`)
  }
  
//   function handleSave(event){
//     setNewCard(
//       {
//         ...newCard,
//         [event.target.name] :event.target.value
//       }
//     )
//   }
  
  async function handleSubmit(event){
    
    event.preventDefault()
    const abortController = new AbortController()
    const response = await createCard(
        deckId,
        { ...newCard },
          abortController.signal
       );
    history.go(0)
    setNewCard(initialCardState)
    return response
  }
  return (
    <main>
      <ol className="breadcrumb">
          <li className="breadcrumb-item">
              <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">React Router / Add Card</li>
        </ol>
      <h4>React Router: Add Card</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <textarea rows="4" cols="50" name="front" value={newCard.front} placeholder="Front side of card" onChange={handleChange}/><br/>
        <label htmlFor="back">Back</label>
        <textarea rows="4" cols="50" name="back" value={newCard.back} placeholder="Back side of card" onChange={handleChange}/><br/>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Done</button>
      </form>

     </main>
  )
}