import React from 'react';
import ReactDOM from 'react-dom';
import EventYears from './EventYears';
import EventSearch from './EventSearch';

export default ({selectedType, selectType}) => {
  let types = [
    {text: 'Todos'},
    {type: 0, text: 'Externo'},
    {type: 1, text: 'Interno'}
  ];

  let typesRadios = types.map((type, i) => (
      <a href="#" key={i}
        className={"ev-select " + (selectedType === type.type ? 'is-active' : '')}
        onClick={() => selectType(type.type)}
        >
        <span className="ev-select__icon"></span>
        <span className="ev-select__text">{type.text}</span>
      </a>
    )
  )

  return (
    <div className="ev-select-group">
      {typesRadios}
    </div>
  );
}
