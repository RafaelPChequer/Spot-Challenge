import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, placeholder, className, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
