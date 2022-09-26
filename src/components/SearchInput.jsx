import React from 'react';

function SearchInput() {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Buscar Receitas"
      />
    </div>
  );
}

export default SearchInput;
