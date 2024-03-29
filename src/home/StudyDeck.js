import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from ".././utils/api";
import { readCard } from ".././utils/api";
import ViewCard from "./ViewCard";

export default function StudyDeck() {
  const { deckId, cardId } = useParams();
  console.log("CardId", cardId);

  const [currentDeck, setCurrentDeck] = useState({ cards: [] });
  const [currentCard, setCurrentCard] = useState("0");
  const [flippedCard, setFlippedCard] = useState(false);

  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        console.log("Response", response);
        setCurrentDeck(response);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }
    loadDeck();
    console.log("currentDeck", currentDeck);
    return () => {
      AbortController.abort();
    };
  }, [deckId]);

  const cards = currentDeck.cards;

  setCurrentCard
  //  const mappedCards = cards.map((card) => <ViewCard key={card.id} card={card.front}/>
  //  )

  //  console.log("mappedCards" , mappedCards)

  // function flipCard(){
  //   if (flippedCard.front === true ){
  //     setFlippedCard(card.front)
  //   } else {
  //     setFlippedCard(card.back)
  //   }
  // }

  // function showNextButton(){
  //   if (flippedCard.front === false){
  //     return (<button
  //               onClick={() => nextCard(index + 1, cards.length)}
  //               className="btn btn-primary mx-1">
  //         Next</button>)
  //   }
  // }

  console.log("currentDeck Outside", currentDeck.cards);
  return (
    <main>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">{/* <Link to="/">Home</Link> */}</li>
        <li className="breadcrumb-item active">Rendering In React / Study</li>
      </ol>
      <div className="card">
        <ViewCard card={card} />
      </div>
    </main>
  );
}
