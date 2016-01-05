import React from 'react';
import ReactDOM from 'react-dom';
import EventYears from './EventYears';
import EventSearch from './EventSearch';
import EventTypeRadio from './EventTypeRadio';

export default ({events, selectedYear, selectYear, query, changeSearch, selectedType, selectType}) => {
  return (
    <div className="ev-page-header">
      <EventYears events={events} selectedYear={selectedYear} selectYear={selectYear} />
      <EventSearch query={query} changeSearch={changeSearch} />
      <EventTypeRadio selectedType={selectedType} selectType={selectType} />
    </div>
  );
}
