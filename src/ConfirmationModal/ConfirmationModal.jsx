import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmationModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {this.props.item}?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.onConfirm}>Ok</Button>{' '}
            <Button color="secondary" onClick={this.props.onCancel}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  item: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ConfirmationModal;
