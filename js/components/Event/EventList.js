import React from 'react';
import ReactDOM from 'react-dom';
import Event from './Event';
import EventEmptyResult from './EventEmptyResult';

export default ({events}) => {
  let result = events.length
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
}
