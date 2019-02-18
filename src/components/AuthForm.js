import React, {Component} from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '' 
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.isSignUp ? 'signup' : 'signin';
    this.props.onAuth(authType, this.state)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(() => {
        return;
      })
  }

  render() {
    const {username, email, password} = this.state;
    const {buttonText, isSignUp} = this.props;
    return(
      <div>
        <form className="justify-content-md-center text-center auth-form" onSubmit={this.handleSubmit}>
          {isSignUp && (
            <div>
              <label htmlFor="username">Username: </label>
              <input
                className="form-control"
                autoComplete="false"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
          )}
          <div>
            <label htmlFor="email">Email: </label>
            <input
              className="form-control"
              autoComplete="false"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              className="form-control"
              autoComplete="false"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary"type="submit">{buttonText}</button>
        </form>
      </div>
    );
  }
};

export default AuthForm;