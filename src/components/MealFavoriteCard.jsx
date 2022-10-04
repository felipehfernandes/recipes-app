import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function MealFavoriteCard({ item, index }) {
  const [isCopied, setIsCopied] = useState(false);

  const { id, image, name, category, nationality } = item;

  const handleCopy = () => {
    copy(`http://localhost:3000/meals/${id}`);
    setIsCopied(true);
  };
  return (
    <div className="recipe-detail">
      <Link to={ `/meals/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          className="recipe-image"
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h3>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { `${nationality} - ${category}` }
        </h4>
      </Link>
      <input
        type="image"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share"
        onClick={ handleCopy }
      />
      {
        isCopied && <p>Link copied!</p>
      }
    </div>
  );
}

MealFavoriteCard.propTypes = {
  item: propTypes.shape().isRequired,
  index: propTypes.number.isRequired,
};
