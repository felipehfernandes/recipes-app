import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import RecipesAppProvider from './context/RecipesAppProvider';

import Login from './components/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';

import MealRecipe from './pages/MealRecipe';
import MealInProgress from './pages/MealInProgress';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinkInProgress from './pages/DrinkInProgress';

import Complete from './pages/Complete';
import Favorites from './pages/Favorites';

function App() {
  return (
    <RecipesAppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id" component={ MealRecipe } />
        <Route exact path="/drinks/id" component={ DrinkRecipe } />
        <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ Complete } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
      </Switch>
    </RecipesAppProvider>
  );
}

export default App;
