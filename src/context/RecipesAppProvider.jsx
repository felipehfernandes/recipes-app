import React from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const contextValue = {};
  return <RecipesAppContext value={ contextValue }>{children}</RecipesAppContext>;
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
