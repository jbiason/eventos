import React, {PropTypes} from 'react';

const Radio = ({text, val}) => {
  return (
    <a href="#"
      className="ev-select"
      >
      <span className="ev-select__icon"></span>
      <span className="ev-select__text">{text}</span>
    </a>
  );
};

Radio.propTypes = {
  text: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
};

export default Radio;
