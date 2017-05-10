import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, Input, ModalFooter } from 'reactstrap';

class AddingModal extends Component {
  state = { title: '' };
  handleChange = (event) => {
    this.setState({
      title: event.target.value
    });
  };
  onConfirm = () => {
    this.props.onConfirm(this.state.title);
  };
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Input placeholder="Enter category title" value={this.state.title} onChange={this.handleChange} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onConfirm}>Ok</Button>{' '}
            <Button color="secondary" onClick={this.props.onCancel}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

AddingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default AddingModal;