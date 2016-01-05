import React from 'react';
import ReactDOM from 'react-dom';

export default ({events}) => {
  // let data = events.map((event, i) => <Event event={event} key={i}/>);
  return (
    <div className="year-list">
      <div>
        <button className="pure-button" data-js="year-button" type="button" disabled>2000</button>
      </div>
      <div>
        <button className="pure-button" data-js="year-button" type="button">2010</button>
      </div>
    </div>
  );
}
