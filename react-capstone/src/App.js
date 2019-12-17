import React from 'react';
import './App.css';
import UserDashboard from "./UserDashboard";
// import AdminDashboard from "/AdminDashboard";
import LoginRegisterForm from "./LoginRegisterForm";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      // checking to see if the user is a regular user 
      loggedInUser: null,
      // checking to see if user is the administrator
      isAdministrator: false, 
      submissions: []
    };
  }

  // create register route to be passed into the register component
  register = async registerInfo => {
    // we have to fetch this information in the route to our api 
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/users/register",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(registerInfo),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    const parsedLoginResponse = await response.json();

    // if the response if cleared
    if (parsedLoginResponse.data.username === "administrator") {
      this.setState({
        isAdministrator: true,
        loggedInUser: this.state.loggedInUser
      });
    } else {
      // if the response is good 
      if (response.ok) {
        this.setState({
          loggedIn: true,
          loggedInUser: parsedLoginResponse.data // array from flask 
        });
      } else {
        console.log(parsedLoginResponse);
      }
    }
  }

  // create a route to login 
  login = async loginInfo => {
    const response = await fetch(
      // fetch the response from the API
      process.env.REACT_APP_API_URL + "/api/v1/users/login",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    const parsedLoginResponse = await response.json();

    if (parsedLoginResponse.data.username === "administrator") {
      this.setState({
        isAdministrator: true, 
        loggedInUser: this.state.loggedInUser
      })

    } else {
      // if the reponse is good 
      if (parsedLoginResponse.status.code === 200) {
        this.setState({
          loggedIn: true, 
          loggedInUser: parsedLoginResponse.data // array from flask 
        })

      } else {
        console.log(parsedLoginResponse);
      }
    }
  }

  administratorLogout = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "api/v1/users/logout",
      {
        method: "GET",
        credentials: "include",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const parsedLoginResponse = await response.json();

    if (parsedLoginResponse.status.code === 200) {
      this.setState({
        isAdministrator: false
      });
    } else {
      console.log(parsedLoginResponse);
    }
  };

  userLogOut = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/users/logout",
      {
        method: "GET",
        credentials: "include",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const parsedLoginResponse = await response.json();

    if (parsedLoginResponse.status.code === 200) {
      this.setState({
        loggedIn: false 
      });
    } else {
      console.log(parsedLoginResponse);
    }
  };

  seeSubmissions = async () => {
      try {
        console.log(this.state, "<- this is state")
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
  const componentToRender = () => {
    // if they are the administrator, take them to the administrator dashboard 
    if (this.state.isAdministrator) {
      return (
        <h1>Placeholder Return</h1>
        )
    } else if (this.state.loggedIn) {
      return (
        // if they are a User, bring them to the User dashboard
        <UserDashboard 
          loggedInUser={this.state.loggedInUser}
          userLogout={this.userLogOut}
          seeSubmissions={this.seeSubmissions}
        />
      );
    } else {
      return (
        //bring them to the loginRegister form 
        <LoginRegisterForm login={this.login} register={this.register} />
      );
    }
  };
  return <div className="App">{componentToRender()}</div>;
};
}


export default App;
        // <AdminDashboard
        // loggedInUser={this.state.loggedInUser}
        // administratorLogout={this.administratorLogout}
        // />
