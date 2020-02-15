// /client/App.js
import React, { Component } from 'react';

import Login from './Login';
import Register from './Register';
import Test from './Test';
import Profile from './Profile';

import {Route} from 'react-router-dom'


class App extends Component {

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    return (
      <div>
        <div>
          <Route path="/login" component={Login} />
        </div>
        <div>
          <Route path="/test" component={Test} />
        </div>
        <div>
          <Route path="/register" component={Register} />
        </div>
        <div>
          <Route path="/profile" component={Profile} />
        </div>
      </div>
    );
  }
}

export default App;