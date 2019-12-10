import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      name: '',
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
    console.log('hello')
    const registerResponse = await fetch(process.env.REACT_APP_API_URL + 'api/v1/users/register', {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await registerResponse.json();

    if(parsedResponse.status.message === 'Success'){
      // change our component
      console.log('successful login')
      // this automatically get passed to your component as a prop
      this.props.history.push('/dogs');
    }
  }
  render(){
    return (

      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' />
        </Form.Field>
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
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      )
  }
}

export default Register;