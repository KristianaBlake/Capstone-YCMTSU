import React, { Component } from "react";
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Container } from 'semantic-ui-react';

class SubmitStory extends Component {
	constructor(props) {
		super();
		this.state = {
			category: "",
			title: "",
			description: "",
			anonymous: ""
		}
	}

	handleChange = e => {
		this.setState({ [e.currentTarget.name: e.currentTarget.value]});
	}

	const category = [
	{ key: 'l', text: 'Life', value: 'life' },
	{ key: 'fr', text: 'Friends', value: 'friends'},
	{ key: 'so', text: 'Significant Other', value: 'significant other'},
	{ key: 'fm' text: 'Family', value: 'family'}
	]

	render() {
		return (
			<Form>
			<Form.Field
	            control={Select}
	            label='Category'
	            category={category}
	            placeholder='Category'
          	/>
          	<Form.Field
	            control={Input}
	            label='Title'
	            placeholder='Title'
          	/>
          	<Form.Field
	          control={TextArea}
	          label='Description'
	          placeholder='So what had happened was...'
        	/>
        	<Form.Field
	          control={Checkbox}
	          label='Anonymous'
        	/>
        	<Container class="container">
	        	<p>
	        	Disclaimer: 
	        	All stories are approved by the "You Can't Make This Up" team. No hateful or discriminatory submissions allowed. 
	        	 <Checkbox label='I agree to the Terms and Conditions' />
        	</p> 
        	</Container>
        	<Button type='submit'>Submit</Button>
			</Form> 

		)
	}
}

export default SubmitStory;