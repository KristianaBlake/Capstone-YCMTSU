import React, { Component } from "react";
import { Form, Button, Label, Header, Divider } from "semantic-ui-react";

class LoginRegisterForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      action: "login"
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.loginRegister();
  }
  
  loginRegister = () => {
    if (this.state.action === "login") {
      this.props.login({
        username: this.state.username,
        password: this.state.password
      });
    } else {
      this.props.register({
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
    }
  }

  switchForm = () => {
    if (this.state.action === "login") {
      this.setState({
        action: "register"
      });
    } else {
      this.setState({
        action: "login"
      });
    }
  };
  render() {
    return (
      <div>
        <div>
          <br></br>
          <Header>
            <h1> You Can't Make This Stuff Up </h1>
          </Header>
          <br></br>
        </div>
        <div className="LoginRegisterForm">
          <Form onSubmit={this.handleSubmit}>
            {this.state.action === "register" ? (
              <React.Fragment>
                <Label>Name:</Label>
                <Divider hidden />
                <Form.Input
                  type="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                ></Form.Input>
              </React.Fragment>
            ) : null}

            <br></br>

            <Label>Username:</Label>
            <Divider hidden />
            <Form.Input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            ></Form.Input>

            <br></br>

            <Label>Email:</Label>
            <Divider hidden />
            <Form.Input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></Form.Input>

            <br></br>

            <Label>Password:</Label>
            <Divider hidden />
            <Form.Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></Form.Input>
            <Divider hidden />
            <Button type="Submit">
              {this.state.action === "register" ? "Register" : "Login"}
            </Button>
          </Form>
          <br></br>
          {this.state.action === "register" ? (
            <small>
              Already have an account? Log in{" "}
              <span onClick={this.switchForm}>here</span>
            </small>
          ) : (
            <small>
              Need an account? Click {" "}
              <span className="red" onClick={this.switchForm}>here</span> !
            </small>
          )}
        </div>
      </div>
    );
  }
}

export default LoginRegisterForm;