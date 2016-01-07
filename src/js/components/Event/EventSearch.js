import React, {PropTypes} from 'react';

const EventSearch = ({query, changeSearch}) => {
  return (
    <input
      type="text"
      className="ev-header__search"
      data-js="search-input"
      placeholder="Pesquise por nome ou tag"
      defaultValue={query}
      onChange={changeSearch}
      autoFocus
    />
  );
};

EventSearch.propTypes = {
  query: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
};

export default EventSearch;
