import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: this.props.loggedInUser,
      submissions: [],
    };
  }

    seeSubmissions = async () => {
      try {
        const submission = await fetch(
          process.env.REACT_APP_API_URL + "/api/v1/submissions/dashboard/" + this.state.loggedInUser.id,
          {
            method: "GET",
            credentials: "include",
            // body: JSON.stringify(userId),
            header: {
              "Content-Type": "application/json"
            }
          }
        );
        const parsedSubmission = await submission.json();

        this.setState({
          submissions: parsedSubmission.data

        });
      } catch (err) {
        console.log(err)

      }
    }
  

  render() {
    return (
      <div>

        <p>{this.props.loggedInUser.username}</p>
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