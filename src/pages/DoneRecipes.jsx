import React, { useState, useEffect } from 'react';

import { saveDoneRecipes } from '../services/localStorage';

import Header from '../components/Header';
import DrinkDoneCard from '../components/DrinkDoneCard';
import MealDoneCard from '../components/MealDoneCard';

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

  const handleClick = (type) => {
    if (type === 'meal') {
      setIsShowing(doneMeals);
    } else if (type === 'drink') {
      setIsShowing(doneDrinks);
    } else {
      setIsShowing(doneRecipes);
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          // value={ doneRecipes }
          value="All"
          onClick={ ({ target: { value } }) => handleClick(value) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          // value={ doneMeals }
          value="meal"
          onClick={ ({ target: { value } }) => handleClick(value) }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          // value={ doneDrinks }
          value="drink"
          onClick={ ({ target: { value } }) => handleClick(value) }
        >
          Drinks
        </button>
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
