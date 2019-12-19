import React, { Component } from "react";
import { Button, Form, Container } from 'semantic-ui-react';


class CreateSubmission extends Component {
	constructor() {
		super();

		this.state = {
			title: "",
			description: ""
		}
	}

	handleChange = e => {

		
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
	
	}	
	handleSubmit = e => {

		e.preventDefault();

		
		this.props.createSubmission(this.state)
		this.setState({
			title: "",
			description: ""
		});
	}



	render() {
		return (
			<div className="createForm" >
				<Form onSubmit={this.handleSubmit}>

	          	<Form.Input
		            type='text'
		            label='Title'
		            placeholder='Title'
		            name='title'
		            value={this.state.title}
		            onChange={this.handleChange}
	          	/>
	          	<Form.TextArea
	          		type='text'
		            label='Description'
		          	placeholder='So what had happened was...'
		            name='description'
		            value={this.state.description}
		            onChange={this.handleChange}
	        	/>

	        	<Container>
		        	<p className="disclaimer">
		        	Disclaimer: 
		        	All stories are approved by the "You Can't Make This Up" team. No hateful or discriminatory submissions allowed. 
	        		</p> 

	        	<br></br>

	        	<Form.Checkbox 
		          label='I agree to the Terms and Conditions'
		          onChange={this.handleChange}
	        	/>
	        	</Container>

	        	<br></br>
	        	<br></br>

	        	<Button type='submit'>Submit</Button>

	        	<br></br>
	        	<br></br>
	        	<br></br>

				</Form> 
			</div> 
		)
	}
}

export default CreateSubmission;