import React, { Component } from "react";
import CreateSubmission from "../CreateSubmission";
import SubmissionsList from "../SubmissionsList";
import { Grid } from "semantic-ui-react";

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: this.props.loggedInUser,
      submissions: [],

      editModalOpen: false,

      submissionToEdit: {
        category: "",
        title: "",
        description: "",
        anonymous: false 
      }
    };
  }

  createSubmission = async (e, submissionFromForm) => {
    //prevents the browser from reloading when an event is called...
    e.preventDefault();
    try {
      //Call the array of all of the courses in the DB.
      const createdSubmissionResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/submissions/",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(submissionFromForm),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const parsedResponse = await createdSubmissionResponse.json();
      console.log(parsedResponse)
      //push all courses + added course into state.
      this.setState({
        submissions: [...this.state.submissions, parsedResponse.data]
      });

    } catch (err) {}
  }

  editSubmission = idOfSubmissionToEdit => {
        const submissionToEdit = this.state.submissions.find(
            submission => submission.id === idOfSubmissionToEdit
        );
        this.setState({
            idOfSubmissionToEdit: submissionToEdit.id,
            submissionToEdit: {
                ...submissionToEdit
            }
        })
    }

  // deleteSubmission = async id => {
  //   const deleteSubmissionResponse = await fetch(
  //     process.env.REACT_APP_API_URL + "/api/v1/submissions/" + id + "/delete",
  //     {
  //       credentials: "include",
  //       method: "DELETE"
  //     }
  //   );

  //   const deleteSubmissionParsed = await deleteSubmissionResponse.json();
  //   this.setState({
  //     submissions: this.state.submissions.filter(submission => submission.id !== id)
  //   })  
  // }

  render() {
    return (
        <div>
            <Grid>
                {this.props.seeSubmissions.length > 0 ? 
                <Grid.Column>
                    <SubmissionsList seeSubmissions={this.props.seeSubmissions} /> 
                </Grid.Column> 
                : null}

                <Grid.Column>
                    <CreateSubmission createSubmission={this.createSubmission} /> 
                </Grid.Column> 
            </Grid> 
        </div>
    )
    // return (
    //   <div>
    //     <Card.Group>
    //       <Card>
    //         <Card.Content>
    //          <Card.Header>{this.props.loggedInUser.username}</Card.Header>
    //          <Card.Meta>{this.Submission.status}</Card.Meta>
    //         <Card.Description>
    //           {this.Submissions.description}
    //           </Card.Description>
    //        </Card.Content>
    //     <Card.Content extra>
    //     <div className='ui two buttons'>
    //     <Button basic color='green'>
    //       Approve
    //     </Button>
    //     <Button basic color='red'>
    //       Decline
    //     </Button>
    //     </div>
    //     </Card.Content>
    //     </Card>
    //     <Card>
    //     <Card.Content>
  
    //     <Card.Header>Molly Thomas</Card.Header>
    //     <Card.Meta>New User</Card.Meta>
    //     <Card.Description>
    //     Molly wants to add you to the group <strong>musicians</strong>
    //     </Card.Description>
    //     </Card.Content>
    //     <Card.Content extra>
    //     <div className='ui two buttons'>
    //     <Button basic color='green'>
    //       Approve
    //     </Button>
    //     <Button basic color='red'>
    //       Decline
    //     </Button>
    //     </div>
    //     </Card.Content>
    //     </Card>
    //     <Card>
    //     <Card.Content>
        
    //     <Card.Header>Jenny Lawrence</Card.Header>
    //     <Card.Meta>New User</Card.Meta>
    //     <Card.Description>
    //     Jenny requested permission to view your contact details
    //     </Card.Description>
    //     </Card.Content>
    //     <Card.Content extra>
    //     <div className='ui two buttons'>
    //     <Button basic color='green'>
    //       Approve
    //     </Button>
    //     <Button basic color='red'>
    //       Decline
    //     </Button>
    //     </div>
    //     </Card.Content>
    //     </Card>
    //     </Card.Group>
    //   </div>
    // )
  }
}

export default UserDashboard;