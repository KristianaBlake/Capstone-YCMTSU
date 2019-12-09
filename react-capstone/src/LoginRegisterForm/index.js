import React, { Component } from "react";
import { Form, Button, Label, Header, Image, Divider } from "semantic-ui-react";

class LoginREgisterForm extends Component {
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
			</div> 
		)
	}


}