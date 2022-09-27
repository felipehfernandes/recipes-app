import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import RecipesAppContext from '../context/RecipesAppContext';

import { fetchSearch } from '../services/API';

export default function SearchBar({ title }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('i');

  const history = useHistory();

  const { setSearchAnswer } = useContext(RecipesAppContext);

  const handleChange = (value, func) => func(value);

  const fetchFilter = async () => {
    const response = await fetchSearch(search, filter, title);
    if (response[title.toLowerCase()] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }

    if (response[title.toLowerCase()].length === 1) {
      const id = response[title.toLowerCase()][0][`id${title.replace('s', '')}`];
      history.push(`/${title.toLowerCase()}/${id}`);
    }
    setSearchAnswer(response);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.length > 1 && filter === 'f') {
      global.alert('Your search must have only 1 (one) character.');
      return null;
    }

    fetchFilter();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        data-testid="search-input"
        type="text"
        placeholder={ `Search ${title}` }
        value={ search }
        onChange={ ({ target: { value } }) => (handleChange(value, setSearch)) }
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          name="radios"
          value="i"
          onChange={ ({ target: { value } }) => (handleChange(value, setFilter)) }
          checked={ filter === 'i' }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          name="radios"
          value="s"
          onChange={ ({ target: { value } }) => (handleChange(value, setFilter)) }
          checked={ filter === 's' }
        />
      </label>
      <label htmlFor="first letter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first letter"
          name="radios"
          value="f"
          onChange={ ({ target: { value } }) => (handleChange(value, setFilter)) }
          checked={ filter === 'f' }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  title: propTypes.string.isRequired,
};
