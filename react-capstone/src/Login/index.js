import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Render } from "react-router-dom";

class Login extends Component {
	constructor(){
		super();

		this.state = {
			username: '',
			email: '',
			password: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		const loginResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login', {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await loginResponse.json();

    if(parsedResponse.status.message === 'Success'){
      // change our component
      console.log('successful login')
      // this automatically get passed to your component as a prop
      this.props.history.push('/');
    }
  }
  render(){
    return (
    <div>
		<Form onSubmit={this.handleSubmit}>
			<Form.Field>
				<label>Username</label>
				<input placeholder='Username' />
			</Form.Field>
			<Form.Field>
				<label>Email</label>
				<input placeholder='Email' />
			</Form.Field>
			<Form.Field>
				<label>Password</label>
				<input placeholder='password' />
			</Form.Field>

			<Button type='submit'>Submit</Button>
		</Form>
    </div> 
    )
  }
}

export default Login;