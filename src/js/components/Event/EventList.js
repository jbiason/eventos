import React, {PropTypes} from 'react';
import Event from './Event';
import EventEmptyResult from './EventEmptyResult';

const EventList = ({events}) => {
  const result = events.length
    ? events.map((event) => <Event event={event} key={event.id}/>)
    : <EventEmptyResult />
  ;
  return (
    <div className="ev-container">
      <div className="ev-events">
        {result}
        </div>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default EventList;
