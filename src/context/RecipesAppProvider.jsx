import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [searchAnswer, setSearchAnswer] = useState({});

  const context = useMemo(() => (
    {
      searchAnswer,
      setSearchAnswer,
    }
  ), []);

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
