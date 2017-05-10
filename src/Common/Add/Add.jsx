import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Button, Input, InputGroup, InputGroupButton } from 'reactstrap';

class Add extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onAdd(this.input.value, () => {
      this.input.value = '';
    });
  }
  render() {
    return (
      <div className={this.props.className}>
        <Form onSubmit={this.handleSubmit} className="add" inline>
          <FormGroup>
            <InputGroup>
              <Input
                type="text"
                name={this.props.name}
                placeholder={this.props.placeholder}
                getRef={(node) => this.input = node}
              />
              <InputGroupButton>
                <Button color="secondary">Add</Button>
              </InputGroupButton>
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

Add.propTypes = {
  className: PropTypes.string
};

Add.default = {
  className: ''
};

export default Add;
