import React from 'react';

const EventYears = ({events, selectedYear, selectYear}) => {
  const getYears = (evts) => {
    // uniq
    const obj = {};
    evts.map(event => event.formattedYear).forEach(year => obj[year] = year);
    const years = [];
    for (const i in obj) {
      years.push(obj[i]);
    }
    return years.sort((e1, e2) => parseInt(e2) - parseInt(e1));
  };

  const yearsButtons = getYears(events).map((year, index) => {
    return (
      <div key={index}>
        <button className={'pure-button ' + (selectedYear === year ? 'pure-button-disabled' : '')} type="button" onClick={() => selectYear(year)}>{year}</button>
      </div>
    );
  });

  return (
    <div className="year-list">
      {yearsButtons}
    </div>
  );
};

export default EventYears;
