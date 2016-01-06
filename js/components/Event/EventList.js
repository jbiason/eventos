import React from 'react';
import Event from './Event';
import EventEmptyResult from './EventEmptyResult';

export default ({events}) => {
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
