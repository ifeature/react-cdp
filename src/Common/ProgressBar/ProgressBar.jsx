import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './ProgressBar.css';

function ProgressBar({ value, max, className }) {
  const progressBarClassName = classnames('progress', className);
  return (
    <div className={progressBarClassName}>
      <progress className="progress__bar" value={value} max={max} />
    </div>
  );
}

ProgressBar.propTypes = {
  className: PropTypes.string
};

ProgressBar.defaultProps = {
  className: ''
};

export default ProgressBar;
