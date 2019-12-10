import React, { Component } from "react";
import { Form, Button, Label, Header, Image, Divider } from "semantic-ui-react";

class LoginRegisterForm extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			username: "",
			email: "",
			password: ""
			action: ""
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
	          <Header>
	            <h1> You Can't Make This Stuff Up </h1>
	          </Header>
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

	            <Label>Username:</Label>
	            <Divider hidden />
	            <Form.Input
	              type="username"
	              name="username"
	              value={this.state.username}
	              onChange={this.handleChange}
	            ></Form.Input>

	            <Label>Email:</Label>
	            <Divider hidden />
	            <Form.Input
	              type="email"
	              name="email"
	              value={this.state.email}
	              onChange={this.handleChange}
	            ></Form.Input>

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
	          {this.state.action === "register" ? (
	            <small>
	              Already have an account? Log in{" "}
	              <span onClick={this.switchForm}>here</span>
	            </small>
	          ) : (
	            <small>
	              Need an account? Sign up{" "}
	              <span onClick={this.switchForm}>here</span>!
	            </small>
	          )}
	        </div>
			</div> 
		)
	}


}

export default LoginRegisterForm;