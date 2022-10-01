import React, { useState, useEffect } from 'react';

import { saveDoneRecipes } from '../services/localStorage';

import Header from '../components/Header';
import DrinkDoneCard from '../components/DrinkDoneCard';
import MealDoneCard from '../components/MealDoneCard';
import Buttons from '../components/Buttons';

import mockRecipes from '../tests/helpers/mockForDoneRecipes';

import '../styles/doneCard.css';

export default function Complete() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneMeals, setDoneMeals] = useState(mockRecipes);
  const [doneDrinks, setDoneDrinks] = useState([]);
  const [isShowing, setIsShowing] = useState([]);

  useEffect(() => {
    const allDoneRecipes = saveDoneRecipes('doneRecipes');

    setDoneRecipes(allDoneRecipes);
    setIsShowing(allDoneRecipes);

    const doneMealsRecipes = allDoneRecipes.filter(
      (recipe) => recipe.type === 'meal',
    );
    setDoneMeals(doneMealsRecipes);

    const doneDrinksRecipes = allDoneRecipes.filter(
      (recipe) => recipe.type === 'drink',
    );
    setDoneDrinks(doneDrinksRecipes);
  }, []);

  const handleClick = ({ target: { value } }) => {
    if (value === 'meal') {
      setIsShowing(doneMeals);
    } else if (value === 'drink') {
      setIsShowing(doneDrinks);
    } else {
      setIsShowing(doneRecipes);
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <Buttons handleClick={ handleClick } />
        <ul>
          {
            isShowing.map((recipeItem, index) => {
              if (recipeItem?.type === 'meal') {
                return (
                  <MealDoneCard
                    key={ index }
                    item={ recipeItem }
                    index={ index }
                  />
                );
              }
              return (
                <DrinkDoneCard
                  key={ index }
                  item={ recipeItem }
                  index={ index }
                />
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}
