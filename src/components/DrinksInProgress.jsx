import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { fetchByID } from '../services/API';

import {
  saveFavoriteRecipes,
  getFavoriteRecipes,
  delFavoriteRecipes,
  getInProgressRecipes,
  saveInProgressRecipes,
} from '../services/localStorage';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DrinkDetail({ id }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [shareRecipe, setShareRecipe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredientsTrue, setIngredientsTrue] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { drinks } = await fetchByID(id, 'Drinks');
      setRecipe(drinks[0]);
    };
    fetch();
  }, []);

  useEffect(() => {
    const favoriteList = getFavoriteRecipes();
    if (favoriteList) {
      setIsFavorite(favoriteList.some((e) => e.id === id));
    }
  }, [isFavorite]);

  useEffect(() => {
    const listInProgressRecipes = getInProgressRecipes();

    if (recipe.idDrink) {
      const recipeMeal = {
        ...listInProgressRecipes,
        drinks: {
          ...listInProgressRecipes.drinks,
          [recipe.idDrink]: ingredientsTrue,
        },
      };
      saveInProgressRecipes(recipeMeal);
    }
  }, [ingredientsTrue]);

  useEffect(() => {
    const ingredientFirst = Object.keys(recipe).indexOf('strIngredient1');
    const ingredientLast = Object.keys(recipe).indexOf('strIngredient15');
    const measureFirst = Object.keys(recipe).indexOf('strMeasure1');
    const measureLast = Object.keys(recipe).indexOf('strMeasure15');

    const ingredientValues = Object.values(recipe).slice(
      ingredientFirst,
      ingredientLast,
    );
    const measureValues = Object.values(recipe).slice(
      measureFirst,
      measureLast,
    );

    setIngredients(
      ingredientValues.filter((ingredient) => ingredient !== null && ingredient !== ''),
    );
    setMeasures(measureValues.filter((measure) => measure !== null && measure !== ' '));
  }, [recipe]);

  const isAlcoholic = recipe?.strAlcoholic === 'Alcoholic' ? '- Alcoholic' : '';

  const handleShare = () => {
    copy(`http://localhost:3000/drinks/${recipe.idDrink}`);
    setShareRecipe(true);
  };

  const handleFavorites = () => {
    if (isFavorite) {
      delFavoriteRecipes(id);
    } else {
      const favorite = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      saveFavoriteRecipes(favorite);
    }
    setIsFavorite(!isFavorite);
  };

  const setCheckbox = ({ target }) => {
    const { name, checked } = target;

    if (checked) {
      if (ingredientsTrue.length > 0) {
        setIngredientsTrue([...ingredientsTrue, name]);
      } else {
        setIngredientsTrue([name]);
      }
    } else {
      setIngredientsTrue(ingredientsTrue.filter((ingredient) => ingredient !== name));
    }
  };

  return (
    <div className="recipe-detail">
      <input
        type="image"
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="heart icon"
        onClick={ handleFavorites }
      />
      <input
        type="image"
        data-testid="share-btn"
        src={ shareIcon }
        alt="share icon"
        onClick={ handleShare }
        className="share-btn"
      />
      {shareRecipe && <p>Link copied!</p>}
      <h1 data-testid="recipe-title">{recipe?.strDrink}</h1>
      <img
        data-testid="recipe-photo"
        src={ recipe?.strDrinkThumb }
        alt={ recipe?.strDrink }
        className="img-recipe-detail"
      />
      {ingredients.map((ingredient, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          key={ index }
          htmlFor={ index }
        >
          <input
            id={ index }
            type="checkbox"
            name={ `${ingredient} - ${measures[index]}` }
            onClick={ setCheckbox }
          />
          <span className="checkbox">{`${ingredient} - ${measures[index]}`}</span>
        </label>
      ))}
      <h2 data-testid="recipe-category">
        {`${recipe?.strCategory} ${isAlcoholic}`}
      </h2>
      <fieldset className="recipe-instructions">
        <p data-testid="instructions">{recipe?.strInstructions}</p>
      </fieldset>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          className="start-recipe-btn"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

DrinkDetail.propTypes = {
  id: propTypes.string.isRequired,
};
