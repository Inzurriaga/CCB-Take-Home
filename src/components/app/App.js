import React from "react";
import Home from "../home/Home";
import MovieDescription from "../movieDescription/MovieDescription";
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/movie/:id" render={({ match }) => {
          return <MovieDescription  key={match.params.id} id={match.params.id}/>
        }}/>
      </Switch>
  );
}

export default App;
