import React from 'react';

export default ({selectedType, selectType}) => {
  const types = [
    {text: 'Todos'},
    {type: 0, text: 'Externo'},
    {type: 1, text: 'Interno'},
  ];

  const typesRadios = types.map((type, i) => (
      <a href="#" key={i}
        className={'ev-select ' + (selectedType === type.type ? 'is-active' : '')}
        onClick={() => selectType(type.type)}
        >
        <span className="ev-select__icon"></span>
        <span className="ev-select__text">{type.text}</span>
      </a>
    )
  );

  return (
    <div className="ev-select-group">
      {typesRadios}
    </div>
  );
};
