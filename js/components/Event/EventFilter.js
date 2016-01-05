import React from 'react';
import ReactDOM from 'react-dom';
import EventYears from './EventYears';
import EventSearch from './EventSearch';

export default ({events, query, selectedYear, selectYear, changeSearch}) => {
  return (
    <div className="ev-page-header">
      <EventYears events={events} selectedYear={selectedYear} selectYear={selectYear} />
      <EventSearch query={query} changeSearch={changeSearch} />
    </div>
  );
}

// <div class="ev-select-group" data-js="type-list"></div>
