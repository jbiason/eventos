import React from 'react';
import ReactDOM from 'react-dom';

export default ({events}) => {
  // // let data = events.map((event, i) => <Event event={event} key={i}/>);
  // let years =       _.sortBy(_.uniq(_.map(this.evts, function(item) {
  //         return item.getYear();
  //       })), function(item) {
  //         return -item; // descending sort
  //       });


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
