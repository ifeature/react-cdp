import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';

import './ListItem.css';

function ListItem({ title, done, onComplete, onEdit }) {
  return (
    <div className="list-item">
      <Input type="checkbox" defaultChecked={done} onChange={onComplete} />
      <span className="list-item__title">{title}</span>
      <Button className="list-item__edit" size="sm" onClick={onEdit}>
        <i className="fa fa-pencil-square-o"></i>
      </Button>
    </div>
  );
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default ListItem;
