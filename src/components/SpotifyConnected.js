import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import {makeApiCall} from '../services/api';
import {connectSpotify} from '../services/spotify';

class SpotifyConnected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: ''
    };
  }

  componentDidMount() {
    this.getAccessToken();
  }

  setCookies(access, refresh, expires) {
    const cookies = new Cookies();
    let date = new Date();
    date.setSeconds(date.getSeconds() + expires);
    localStorage.setItem(
      'at', 
      JSON.stringify({
      token: access,
      expiresAt: date
      })
    );
    date.setFullYear(date.getFullYear() + 1);
    cookies.set('rt', refresh, { path: '/', expires: date});    
  }

  getAccessToken() {
    const loc = window.location;
    const authCode = queryString.parse(loc.search).code;

    makeApiCall(
      'post', 
      '/api/spotify/connect',
      {
        "code": authCode
      }
    ).then(res => {
      this.setCookies(res.access_token, res.refresh_token, res.expires_in);
      this.setState({isLoaded: true, error:''});
      setTimeout(() =>{
        this.props.history.push('/');
      }, 2500);
    }).catch(err => {
      const error = err || 'An unexpected error occurred.';
      this.setState({isLoaded: true, error: error });
    });
  }

  render() {
    const {isLoaded, error} = this.state;
    return (
      <div className="spotify-container">
      {!isLoaded && (
        <div className="spinner">
          <div className="spinner-border" />
        </div>
      )}
      {isLoaded && !error && (
        <div>
          <h1> Success! </h1>
          <h3> Your Spotify is now connected. </h3>
          <p> Redirecting... </p>
          <div className="spinner">
            <div className="spinner-border" />
          </div>
        </div>
        )
      }
      {isLoaded && !!error && (
        <div>
          <h1> Oops! </h1>
          <h3> There was an error connecting your Spotify account. </h3>
          <p> {error} </p>
          <button className="btn btn-primary" onClick={connectSpotify}>
            Retry
          </button>
        </div>
        )
      }
      </div>
    );
  };
}

export default withRouter(SpotifyConnected);