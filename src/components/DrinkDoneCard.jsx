import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DrinkDoneCard({ item, index }) {
  const [isCopied, setIsCopied] = useState(false);

  const { id, image, name, category, alcoholicOrNot, doneDate } = item;

  const handleCopy = () => {
    copy(`http://localhost:3000/drinks/${id}`);
    setIsCopied(true);
  };

  return (
    <div>
      {console.log(item)}
      <Link to={ `/drinks/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h3>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { `${category} - ${alcoholicOrNot}` }
        </h4>
        <h5 data-testid={ `${index}-horizontal-done-date` }>
          { doneDate }
        </h5>
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

DrinkDoneCard.propTypes = {
  item: propTypes.shape().isRequired,
  index: propTypes.number.isRequired,
};
