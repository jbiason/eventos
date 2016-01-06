import React, {PropTypes} from 'react';
import EventYears from './EventYears';
import EventSearch from './EventSearch';
import EventTypeRadio from './EventTypeRadio';

const Event = ({events, selectedYear, selectYear, query, changeSearch, selectedType, selectType}) => {
  return (
    <div className="ev-page-header">
      <EventYears events={events} selectedYear={selectedYear} selectYear={selectYear} />
      <EventSearch query={query} changeSearch={changeSearch} />
      <EventTypeRadio selectedType={selectedType} selectType={selectType} />
    </div>
  );
};

Event.propTypes = {
  events: PropTypes.array,
  selectedYear: PropTypes.number,
  selectYear: PropTypes.func,
  query: PropTypes.string,
  changeSearch: PropTypes.func,
  selectedType: PropTypes.number,
  selectType: PropTypes.func,
};

export default Event;
