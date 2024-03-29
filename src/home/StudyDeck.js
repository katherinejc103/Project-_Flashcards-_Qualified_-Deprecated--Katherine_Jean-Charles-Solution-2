import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {readDeck} from ".././utils/api"
import {readCard} from ".././utils/api"
import ViewCard from "./ViewCard"

export default function StudyDeck() {
  
  const { deckId, cardId } = useParams()
  console.log("CardId", cardId)
  
 const [currentDeck, setCurrentDeck] = useState({})
//  const [cards, setCards] =useState("")
 const [flippedCard, setFlippedCard] =useState(false)
   
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
        console.log("currentDeck" , currentDeck)
        return () => {
        };
    }, [deckId])

    // const loadCard = readCard(cardId)
    // console.log("loadCard" , loadCard)


    
    const cards = currentDeck.cards

    cards.map((card) => <ViewCard key={id}/>)
    


    console.log("currentDeck Outside" , currentDeck.cards)
  return (
    <main>
      <ol className="breadcrumb">
          <li className="breadcrumb-item">
             {/* <Link to="/">Home</Link> */} 
          </li>
          <li className="breadcrumb-item active">Rendering In React / Study</li>
        </ol>
      <div className="card"></div>
     </main>
  )
}