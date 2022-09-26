import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import SearchInput from './SearchInput';

import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header({ pageTitle, searchBtn }) {
  const [search, setSearch] = useState(false);

  const handleSearch = () => {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  return (
    <div>
      <header>
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profile" />
        </Link>
        <h1 data-testid="page-title">{pageTitle}</h1>
        {searchBtn && (
          <button type="button" onClick={ handleSearch }>
            <img data-testid="search-top-btn" src={ SearchIcon } alt="search" />
          </button>
        )}
      </header>
      {search && <SearchInput page={ pageTitle } />}
    </div>
  );
}

Header.propTypes = {
  pageTitle: propTypes.string.isRequired,
  searchBtn: propTypes.bool.isRequired,
};

export default Header;
