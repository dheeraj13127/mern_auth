import React from 'react'
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Activation from './components/Activation';
import Dashboard from './components/Dashboard';

function App() {

  
  return (
    <Router>
        <div className="container">
          <Route path="/" exact component={Landing}/>
          <Route path="/signIn" exact component={SignIn}/>
          <Route path="/signUp" exact component={SignUp}/>
          <Route path="/authentication/activate/:token" exact component={Activation}/>
          <Switch>
          <Route path="/dashboard" exact component={Dashboard}/>
  
          </Switch>
     
         </div>
    </Router>
   
  );
}

export default App;
