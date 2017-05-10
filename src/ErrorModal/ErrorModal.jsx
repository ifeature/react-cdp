import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ErrorModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            You should select category first.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.onConfirm}>Ok</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ErrorModal;
