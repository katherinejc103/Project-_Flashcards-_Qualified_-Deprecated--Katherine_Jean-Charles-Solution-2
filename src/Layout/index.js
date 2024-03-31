import React from "react";
import NotFound from "./NotFound";
import StudyDeck from "../home/StudyDeck";
import Deck from "../home/Deck";
import EditDeck from "../home/EditDeck";
import AddCard from "../home/AddCard"
import EditCard from "../home/EditCard";
import Home from "../home/Home"
import CreateDeck from "../home/CreateDeck"
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Layout() {
  return (
    <main>
      <div className="container">
        <Switch>
        <Route exact path="/" component={Home} />      
        {/* TODO: Implement the screen starting here */}
        <Route exact path="/decks/new" component={CreateDeck} />
        <Route exact path="/decks/:deckId/study" component={StudyDeck} />
        <Route exact path="/decks/:deckId" component={Deck} />
        <Route exact path="/decks/:deckId/edit" component={EditDeck} />
        <Route exact path="/decks/:deckId/cards/new" component={AddCard} />
        <Route exact path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
        <NotFound />
        </Switch>
      </div>
    </main>
  );
}

export default Layout;
