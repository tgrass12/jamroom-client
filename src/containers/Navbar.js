import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth'

class Navbar extends Component {

  logout = e => {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const {currentUser} = this.props;
    return (
      <nav>
        <div className="navbar">
          <Link to='/'>Jamroom</Link>
          {!currentUser.isAuthenticated && (
            <ul className="nav navbar-nav ml-auto">
              <Link to='/signin'>Sign in</Link>
              <Link to='/signup'>Sign up</Link>
            </ul>
          )}
          {currentUser.isAuthenticated && (
            <ul className="nav navbar-nav ml-auto">
              <a className="logout" href="/" onClick={this.logout}>Log Out</a>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {logout})(Navbar);