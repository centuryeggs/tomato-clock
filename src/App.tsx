import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import Index from './components/Index/Index'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import { BrowserRouter as Router, Route} from "react-router-dom";
=======
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import {Router, Route} from "react-router-dom";
import history from './config/history'
>>>>>>> 5a80488d9a7a31c07885cc4501d663e6f77a2702

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <Router>
      <div className="App">
        <Route exact path="/" component={Index} />
=======
      <Router history={history}>
      <div className="App">
        <Route exact path="/" component={Home} />
>>>>>>> 5a80488d9a7a31c07885cc4501d663e6f77a2702
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
      </div>
    </Router>
    );
  }
}

export default App;