import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchLobbies } from '../store/actions/lobby';
import LobbyCard from '../components/LobbyCard';

class LobbyBrowser extends Component {
  componentWillMount() {
    this.props.fetchLobbies();
  }

  joinLobby(lobbyId) {
    this.props.history.push(`/lobbies/${lobbyId}`);
  }

  render() {
    const {lobbies} = this.props;
    const lobbyCards = lobbies.map(l => (
      <LobbyCard
        key={l._id}
        lobbyName={l.name}
        host={l.host.username}
        joinLobby={this.joinLobby.bind(this, l._id)}
      />
    ))
    return (
      <div>
        <ul>
          {lobbyCards}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lobbies: state.lobbies
  }
}

export default withRouter(connect(mapStateToProps, {fetchLobbies})(LobbyBrowser));
