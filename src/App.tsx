import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import {Router, Route} from "react-router-dom";
import history from './config/history'

class App extends Component {
  render() {
    return (
      <Router history={history}>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
      </div>
    </Router>
    );
  }
}

export default App;