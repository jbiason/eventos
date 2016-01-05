import React from 'react';
import ReactDOM from 'react-dom';
import Event from './Event';

export default ({events}) => {
  let data = events.map((event, i) => <Event event={event} key={i}/>);
  return (
    <div className="ev-events">
      {data}
    </div>
  );
}
