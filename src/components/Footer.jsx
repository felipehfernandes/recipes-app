import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="icone drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="icone meal" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
