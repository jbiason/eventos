import React from 'react';
import ReactDOM from 'react-dom';

export default ({query, changeSearch}) => {
  return (
    <input
      type="text"
      className="ev-header__search"
      data-js="search-input"
      placeholder="Pesquise por nome ou tag"
      defaultValue={query}
      onChange={changeSearch}
      autofocus
    />
  );
}
