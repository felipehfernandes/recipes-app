import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [searchAnswer, setSearchAnswer] = useState({
    meals: [],
    drinks: [],
  });
  const [categories, setCategories] = useState([]);

  const context = {
    searchAnswer,
    categories,
    setCategories,
    setSearchAnswer,
  };

  return (
    <RecipesAppContext.Provider
      value={ context }
    >
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
