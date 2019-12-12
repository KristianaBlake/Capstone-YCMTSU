import React from 'react';
import { Link }from 'react-router-dom';
import { Header, List } from 'semantic-ui-react';

const HomePage = () => {
  return (
  	<div>
      <Header as='h3' floated='right'>
        <List>
          <List.Item><Link to ='/register'>Register</Link></List.Item>
          <List.Item><Link to='/login'>Login</Link></List.Item>
        </List>
      </Header>
    </div> 
    )
};

export default HomePage;