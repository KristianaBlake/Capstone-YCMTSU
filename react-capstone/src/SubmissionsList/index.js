import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function SubmissionsList(props){
	const submissions = props.submissions.map((submission) => {
		console.log(props)
		return (
			<Card key={submission.id}>
				<Card.Content>
					<Card.Header>{submission.title} </Card.Header>
					<Card.Description> {submission.category} </Card.Description>
					<Card.Description> {submission.description} </Card.Description>
					<Card.Content extra>
					<Button onClick={() => props.editSubmission(submission.id)}> Edit Submission </Button>
					</Card.Content>
				</Card.Content>
			</Card>
		);
	});

	return (
		<div className="submissions">
			<Card.Group>
				{ submissions } 
			</Card.Group>
		</div> 
		)
}

export default SubmissionsList; 
				// <Card.Content extra>
				// 	<Button basic color='pink' onClick={() => props.deleteMakeup(makeup.id)}> Delete Makeup </Button>
				// 	<Button basic color='pink' onClick={() => props.editMakeup(makeup.id)}> Edit Makeup </Button>
				// </Card.Content>
				// Add Button from semantic UI 