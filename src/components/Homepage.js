import React from 'react';
import {Link} from 'react-router-dom';
import LobbyBrowser from '../containers/LobbyBrowser';
import { checkRefreshTokenCookie } from '../services/api';
import { connectSpotify } from '../services/spotify';

const Homepage = ({currentUser, lobbies}) => {
  const refreshToken = checkRefreshTokenCookie();

  if (currentUser.isAuthenticated) {
    return (
      <div>
      {!refreshToken && (
        <div className="connect-spotify">
          <h1>Connect to Spotify to get started.</h1>
            <button 
              className="btn btn-success" 
              onClick={connectSpotify}>
              Connect to Spotify
            </button>
        </div>
      )}
      {refreshToken && (
        <LobbyBrowser />
      )}
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>Welcome to Jamroom!</h1>
      <h4>New?</h4>
      <Link to="/signup" className="btn btn-primary">
        Sign up here
      </Link>
      <h4>Returning user?</h4>
      <Link to="/signin" className="btn btn-primary">
        Log in
      </Link>
    </div>
  )
}

export default Homepage;