import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createLobby } from '../store/actions/lobby';

class LobbyCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyName: ''
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createLobby(this.state.lobbyName);
    this.props.history.push('/')
  }

  render() {
    return (
      <form>
        <label htmlFor='lobbyName'>Lobby Name</label>
        <input 
          className='form-control col-md-6' 
          type='text' 
          id="lobbyName"
          name="lobbyName"
          onChange={this.handleChange}
          />
        <button 
          className="btn btn-primary" 
          type='submit'
          onClick={this.handleSubmit}>
          Create
        </button>
      </form>
    )
  }
}

export default connect(null, {createLobby})(LobbyCreator);