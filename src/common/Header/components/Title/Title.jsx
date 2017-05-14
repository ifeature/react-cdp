import React from 'react';
import PropTypes from 'prop-types';

function Title({ children, className }) {
  return (
    <h1 className={className}>{children}</h1>
  );
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

Title.defaultProps = {
  className: ''
};

export default Title;
