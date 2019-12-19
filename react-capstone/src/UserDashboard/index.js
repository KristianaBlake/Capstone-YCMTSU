import React, { Component } from "react";
import CreateSubmission from "../CreateSubmission";
import SubmissionsList from "../SubmissionsList";
import EditSubmissionModal from "../EditSubmissionModal";
// import { Grid } from "semantic-ui-react";

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: this.props.loggedInUser,
      submissions: [],
      
      submissionToEdit: {
        title: "",
        description: ""
      },

      editModalOpen: false,
      
    };
  }

  componentDidMount() {
    this.props.seeSubmissions();
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

      this.props.seeSubmissions()

    } catch (err) {}
  }

  editSubmission = idOfSubmissionToEdit => {


    console.log(idOfSubmissionToEdit, "<-- id of submission to edit")
    console.log(this.props.submissions, "<-- this.props.submissions")



    const submissionToEdit = this.props.submissions.find(submission => submission.id === idOfSubmissionToEdit);



        this.setState({
          editSubmissionModal: true, 
            idOfSubmissionToEdit: submissionToEdit.id,
            submissionToEdit: {
                ...submissionToEdit
            }
        })
    }

  updateSubmission = async newSubmissionInfo => {
  try {
    const url =
      process.env.REACT_APP_API_URL +
      "/api/v1/submissions/" +
      this.state.idOfSubmissionToEdit + "/update";

    const updateResponse = await fetch(url, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(newSubmissionInfo),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const updateResponseParsed = await updateResponse.json();

    const newSubmissionArrayWithUpdate = this.state.submissions.map(submission => {
      if (submission.id === updateResponseParsed.data.id) {
        submission = updateResponseParsed.data;
      }
      return submission;
    });

    this.setState({
      editSubmissionModal: false,
      submissions: newSubmissionArrayWithUpdate
    });
    // close the modal
    this.closeModal();
    this.props.seeSubmissions();
  } catch (err) {
    console.log("cannot update submission")
  }
}

  closeModal = () => {
    this.setState({
      editSubmissionModal: false
    });
  }

  deleteSubmission = async id => {
    const deleteSubmissionResponse = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/submissions/" + id + "/delete",
      {
        credentials: "include",
        method: "DELETE"
      }
    );

    const deleteSubmissionParsed = await deleteSubmissionResponse.json();
    this.setState({
      submissions: this.state.submissions.filter(submission => submission.id !== id)
    })  
  }

  render() {
    return (
        <div>

          <h2>{this.props.loggedInUser.username}'s Dasboard</h2>

          <br></br>
  
          {this.props.submissions.length > 0 ? 
         
              <SubmissionsList 
              submissions={this.props.submissions} 
              editSubmission={this.editSubmission}/> 
          
          : null}

              <br></br>
              <br></br> 

              <h3>Submit a Story</h3>

              <CreateSubmission createSubmission={this.createSubmission} /> 
              { this.state.editSubmissionModal ? 
              <EditSubmissionModal 
                
                editModalOpen={this.state.editSubmissionModal}
                updateSubmission={this.updateSubmission}
                submissionToEdit={this.state.submissionToEdit}
              />
              : null }

        </div>
    )
  }
}

export default UserDashboard;