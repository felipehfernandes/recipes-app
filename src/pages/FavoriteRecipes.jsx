import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import MealFavoriteCard from '../components/MealFavoriteCard';
import DrinkFavoriteCard from '../components/DrinkFavoriteCard';
import Buttons from '../components/Buttons';

import { saveDoneRecipes, deleteFavoriteRecipes } from '../services/localStorage';

import '../styles/doneCard.css';

import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipesFavorite() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);
  const [isShowing, setIsShowing] = useState([]);
  const [favoriteRemove, setFavoriteRemove] = useState(false);

  const getFavorite = () => {
    const allFavorites = saveDoneRecipes('favoriteRecipes');
    setFavoriteRecipes(allFavorites);
    setIsShowing(allFavorites);

    const favMeals = allFavorites.filter((recipe) => recipe.type === 'meal');
    setFavoriteMeals(favMeals);

    const favDrinks = allFavorites.filter((recipe) => recipe.type === 'drink');
    setFavoriteDrinks(favDrinks);

    setFavoriteRemove(false);
  };

  useEffect(() => {
    getFavorite();
  }, [favoriteRemove]);

  const handleClick = ({ target: { value } }) => {
    if (value === 'meal') {
      setIsShowing(favoriteMeals);
    } else if (value === 'drink') {
      setIsShowing(favoriteDrinks);
    } else {
      setIsShowing(favoriteRecipes);
    }
  };

  const handleRemove = ({ target: { value } }) => {
    deleteFavoriteRecipes('favoriteRecipes', value);
    setFavoriteRemove(true);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <Buttons handleClick={ handleClick } />
        {
          isShowing.map((item, index) => {
            if (item?.type === 'meal') {
              return (
                <div key={ index }>
                  <MealFavoriteCard
                    item={ item }
                    index={ index }
                  />
                  <input
                    type="image"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="favorite"
                    value={ item.id }
                    onClick={ handleRemove }
                  />
                </div>
              );
            }
            return (
              <div key={ index }>
                <DrinkFavoriteCard
                  item={ item }
                  index={ index }
                />
                <input
                  type="image"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite"
                  value={ item.id }
                  onClick={ handleRemove }
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default RecipesFavorite;
