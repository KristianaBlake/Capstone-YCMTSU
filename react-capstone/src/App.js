import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import UserDashboard from "./UserDashboard"
import AdminDashboard from "/AdminDashboard"
import LoginRegisterForm from "./LoginRegisterForm";


const my404 = () => {
  return (
    <div>
      You Are Lost 
    </div>
  )
}

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="login" component={Login} />
        <Route exact path="/admin-dashboard" component={AdminDashboard} />
        <Route exact path="/user-dashboard" component={UserDashboard} />
        <Route exact path="/submit-story" component={SubmitStory} />
        <Route exact path="/life" component={Life} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/significant-other" component={Significant Other} />
        <Route exact path="/family" component={Family} />
        <Route component={My404} /> 
      </Switch>
    </main> 
  )
}

render() {
	
};


export default App;
