import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import RecipesFoodDetails from './pages/RecipesFoodDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import RecipesCompleted from './pages/RecipesCompleted';
import RecipesFavorite from './pages/RecipesFavorite';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/{id-da-receita}" component={ RecipesFoodDetails } />
      <Route exact path="/drinks/{id-da-receita}" component={ RecipesFoodDetails } />
      <Route exact path="/meals/:id/in-progress" component={ RecipesInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipesInProgress } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ RecipesCompleted } />
      <Route exact path="/favorite-recipes" component={ RecipesFavorite } />
    </Switch>
  );
}

export default App;
