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

const App = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/api/v1/users/register" component={Register} />
        <Route exact path="api/v1/users/login" component={Login} />
        <Route exact path="api/v1/submissions/admin" component={AdminDashboard} />
        <Route exact path="/api/v1/submissions/<submission_id>/update" component={UserDashboard} />
        <Route exact path="/api/v1/submissions/<submission_id>/delete" component={UserDashboard} />
        <Route exact path="/api/v1/submissions/<submission_id>/delete" component={UserDashboard} />
        <Route exact path="/api/v1/submissions/dasboard/<user_id>" component={UserDashboard} />
        <Route exact path="/api/v1/submissions/" component={SubmitStory} />
        // admin approves a post 
        <Route exact path="/api/v1/<submission_id>/deny" component={AdminDashboard} />
        // admin denies a post 
        <Route exact path="/api/v1/<submission_id>/deny" component={AdminDashboard} />
        // shows submission under category - Life 
        <Route exact path="/api/v1/submissions/<category>" component={Life} />
        // shows submission under category - Friends 
        <Route exact path="/api/v1/submissions/<category>" component={Friends} />
        // shows submission under category - Significant Other 
        <Route exact path="/api/v1/submissions/<category>" component={Significant Other} />
        // shows submission under category - Family
        <Route exact path="/api/v1/submissions/<category>" component={Family} />
        <Route component={My404} /> 
      </Switch>
    </main> 
  )
}

render() {
	
};

export default App;
