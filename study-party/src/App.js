// /client/App.js
import React, { Component } from 'react';

import Login from './Login';
import Register from './Register';
import Test from './Test';
import Profile from './Profile';
import Toolbar from './Toolbar';
import PartyMap from './PartyMap';


import {Route} from 'react-router-dom'

import './App.css';


class App extends Component {

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    return (
      <div className="height">
        <div className="height">
          <Route path="/login" component={Login} />
        </div>
        <div className="height">
          <Route path="/test" component={Test} />
        </div>
        <div className="height">
          <Route path="/register" component={Register} />
        </div>
        <div className="height">
          <Route path="/profile" component={Profile} />
        </div>
        <div className="height">
          <Route path="/toolbar" component={Toolbar} />
        </div>
        <div className="height">
          <Route path="/partyMap" component={PartyMap} />
        </div>
      </div>
    );
  }
}

export default App;