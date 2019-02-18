import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUser } from '../store/actions/auth';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import SpotifyConnected from '../components/SpotifyConnected';

class Main extends Component { 
  render() {
    const {authUser, currentUser} = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" render={ props => (
             <Homepage currentUser={currentUser} {...props} />
          )} /> 
          <Route exact path="/signin" render={ props => (
            <AuthForm 
              buttonText="Sign In"
              onAuth={authUser}
              {...props} 
            />
          )} />
         <Route exact path="/signup" render={ props => (
            <AuthForm
              isSignUp
              buttonText="Sign Up"
              onAuth={authUser}
              {...props}
            />
          )} />
         <Route exact path="/spotify/connect" component={SpotifyConnected} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

export default withRouter(connect(mapStateToProps, {authUser})(Main));