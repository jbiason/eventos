import React, { PropTypes } from 'react'

const Radio = ({ text, val }) => {
  return (
    <a href="#"
      className="ev-select"
    >
      <span className="ev-select__icon">{val}</span>
      <span className="ev-select__text">{text}</span>
    </a>
  )
}

Radio.propTypes = {
  text: PropTypes.string.isRequired,
  val: PropTypes.node.isRequired,
}

export default Radio
