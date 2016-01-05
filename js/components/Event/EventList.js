import React from 'react';
import ReactDOM from 'react-dom';
import Event from './Event';
import EmptyResult from './EmptyResult';

export default ({events}) => {
  let result = events.length
    ? events.map((event, i) => <Event event={event} key={i}/>)
    : <EmptyResult />
  ;
  return (
    <div className="ev-container">
      <div className="ev-events">
        {result}
        </div>
    </div>
  );
}
