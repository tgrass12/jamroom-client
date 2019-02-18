import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { setAuthHeader, getAccessToken } from './services/api';
import { setCurrentUser } from './store/actions/auth';
import './App.css';
import Main from './containers/Main';
import Navbar from './containers/Navbar';
import {initStore} from './store';

const store = initStore();

if (localStorage.token) {
  setAuthHeader(localStorage.token);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.token)));
    getAccessToken();
  } catch(err) {
    store.dispatch(setCurrentUser({}))
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
