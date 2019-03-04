import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import SpotifyConnected from '../components/SpotifyConnected';
import LobbyCreator from './LobbyCreator';
import Lobby from './Lobby';

class Main extends Component { 
  render() {
    const {authUser, lobbies, currentUser, removeError, errors} = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" render={ props => (
             <Homepage currentUser={currentUser} lobbies={lobbies} {...props} />
          )} /> 
          <Route exact path="/signin" render={ props => (
            <AuthForm 
              pageType="Sign In"
              onAuth={authUser}
              removeError={removeError}
              errors={errors}
              {...props} 
            />
          )} />
          <Route exact path="/signup" render={ props => (
            <AuthForm
              isSignUp
              pageType="Sign Up"
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              {...props}
            />
          )} />
          <Route exact path="/spotify/connect" component={SpotifyConnected} />
          <Route exact path="/lobby/create" render={ props => (
            <LobbyCreator host={currentUser} {...props} />
            )}
          />
          <Route path="/lobbies/:id" render={ props => (
            <Lobby />
            )}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    lobbies: state.lobbies,
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, {removeError, authUser})(Main));