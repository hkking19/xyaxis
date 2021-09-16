import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Anonymous from './components/Anonymous/Anonymous';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import NewOrJoinStage from './components/NewOrJoinStage/NewOrJoinStage';
import Stage from './components/Stage/Stage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={NewOrJoinStage} />
      <Route path='/stage/:stage_id' component={Stage} />
      <Route path='/signUp' component={SignUp} />
      <Route path='/signIn' component={SignIn} />
      <Route path='*' component={Anonymous} />
    </Switch>
  </Router>
);

export default App;
