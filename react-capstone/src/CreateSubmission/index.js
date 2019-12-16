import React, { Component } from "react";
import { Button, Form, Container, TextArea } from 'semantic-ui-react';

const options = [
	{ key: 'l', text: 'Life', value: 'life' },
	{ key: 'fr', text: 'Friends', value: 'friends'},
	{ key: 'so', text: 'Significant Other', value: 'significant other'},
	{ key: 'fm', text: 'Family', value: 'family'},
]

class CreateSubmission extends Component {
	constructor() {
		super();

		this.state = {
			category: "",
			title: "",
			description: "",
			anonymous: false 
		}
	}

	handleChange = e => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
	}



	render() {
		return (
			<div>
				<Form onSubmit={(e) => this.props.createSubmission(e, this.state)}>

			
				<Form.Select
		            label='Category'
		            name='category'
		            options={options}
		            placeholder='Submission Category'
		            onChange={this.handleChange}
	          	/>
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
	        	<Form.Checkbox
		          label='Anonymous'
		          name='anonymous'
		          onChange={this.handleChange}
	        	/>
	        	<Container>
		        	<p>
		        	Disclaimer: 
		        	All stories are approved by the "You Can't Make This Up" team. No hateful or discriminatory submissions allowed. 
	        		</p> 
	        	<Form.Checkbox 
		          label='I agree to the Terms and Conditions'
		          onChange={this.handleChange}
	        	/>
	        	</Container>
	        	<Button type='submit'>Submit</Button>
				</Form> 
			</div> 
		)
	}
}

export default CreateSubmission;