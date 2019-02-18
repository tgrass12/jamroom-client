import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchTracks } from '../store/actions/tracks';

class TrackSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackQuery: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    const query = this.state.trackQuery.trim();
    if (query)
    {
      this.props.fetchTracks(this.state.trackQuery)
    }
  }

  render() {
    return (
        <form 
          className="track-search"
          onSubmit={this.handleSubmit} 
        >
        <div className="form-row">
          <input
            className="form-control col-md-8 track-search"
            placeholder="Find a song..."
            name="trackQuery"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.trackQuery}
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
        </form>
    );
  }
};

export default connect(null, {fetchTracks})(TrackSearch);