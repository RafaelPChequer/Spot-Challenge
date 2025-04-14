import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`transition ${className}`}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
