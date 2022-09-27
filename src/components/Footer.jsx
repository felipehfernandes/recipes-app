import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import RecipesAppContext from '../context/RecipesAppContext';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer({ title }) {
  const history = useHistory();

  const { setSearchAnswer, setCategories } = useContext(RecipesAppContext);

  const handleClick = (page) => {
    setSearchAnswer({
      meals: [],
      drinks: [],
    });
    setCategories([]);

    history.push(`/${page}`);
  };
  return (
    <footer data-testid="footer" className="footer">
      <input
        type="image"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drink icon"
        onClick={ () => handleClick('drinks') }
        disabled={ title === 'Drinks' }
      />
      <input
        type="image"
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        alt="meal icon"
        onClick={ () => handleClick('meals') }
        disabled={ title === 'Meals' }
      />
    </footer>
  );
}

Footer.propTypes = {
  title: propTypes.string.isRequired,
};
