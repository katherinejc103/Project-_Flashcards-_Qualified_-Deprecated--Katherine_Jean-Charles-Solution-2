import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {readDeck} from ".././utils/api"

export default function StudyDeck() {
  
  const { deckId } = useParams()
  
 const [currentDeck, setCurrentDeck] = useState({})
   
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
        };
    }, [deckId])
  
  return (
    <main>
      <ol className="breadcrumb">
          <li className="breadcrumb-item">
              <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Rendering In React / Study</li>
        </ol>
      <h4>{currentDeck.name}</h4>

     </main>
  )
}