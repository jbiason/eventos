import React, { PropTypes } from 'react'
import EventYears from './EventYears'
import EventSearch from './EventSearch'
import EventTypeRadio from './EventTypeRadio'

const EventFilter = ({ events, query, changeSearch, selectedType, selectType }) => {
  return (
    <div className="ev-page-header">
      <EventYears events={events} />
      <EventSearch query={query} changeSearch={changeSearch} />
      <EventTypeRadio selectedType={selectedType} selectType={selectType} />
    </div>
  )
}

EventFilter.propTypes = {
  events: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
  selectedType: PropTypes.number,
  selectType: PropTypes.func.isRequired,
}

export default EventFilter
