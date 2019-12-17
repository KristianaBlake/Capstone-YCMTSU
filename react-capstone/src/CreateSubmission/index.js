import React, { Component } from "react";
import { Button, Form, Container } from 'semantic-ui-react';

const options = [
	{ key: 'l', text: 'Life', value: 'life'},
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
		}
	}

	handleChange = e => {

		console.log(e.currentTarget.name)
		console.log(e.currentTarget.value)
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
	}



	render() {
		return (
			<div className="createForm" >
				<Form onSubmit={(e) => this.props.createSubmission(e, this.state)}>

			
				<Form.Select
		            label='Category'
		            name='category'
		            selection
		            options={options}
		            // value={this.state.category}
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