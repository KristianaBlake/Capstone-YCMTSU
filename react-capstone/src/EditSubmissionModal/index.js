import React from "react";
import { Form, Button, Label, Header, Modal } from "semantic-ui-react";

class EditSubmissionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }

  componentDidMount() {
    
    this.setState({
      title: this.props.submissionToEdit.title,
      description: this.props.submissionToEdit.description
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault(); // no page reload
    this.props.updateSubmission(this.state);
  };

  render() {
    return (
      <Modal
        open={this.props.editModalOpen}
        closeIcon
        onClose={this.props.closeModal}
      >
        <Header>Edit Submission</Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Label> Title: </Label>
            <Form.Input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />

            <Label> Description: </Label>
            <Form.Input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />

            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
export default EditSubmissionModal;