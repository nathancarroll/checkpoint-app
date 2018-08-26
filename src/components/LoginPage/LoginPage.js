import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import {TextField, Button, InputAdornment} from '@material-ui/core';
import MaterialIcon from 'material-icons-react';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('user');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  moveToRegister = () => {
    window.location.href = '/#/register';
  }

  render() {
    return (
      <div id="login-page">
        { this.renderAlert() }
        <h1 id="only-header">CHECKPOINT</h1>
        <form id="login-form" onSubmit={this.login}>
          <div>
              <TextField
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MaterialIcon icon="account_box" />
                    </InputAdornment>
                  ),
                }}
              />
          </div>
          <div>
              <TextField
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MaterialIcon icon="vpn_key" />
                    </InputAdornment>
                  ),
                }}
              />
          </div>
          <div>
            <Button
              type="submit"
            >SUBMIT</Button>
            <Button>
              <Link 
                to="/register" 
                style={{textDecoration: 'none', color: 'black'}}>Register
              </Link>
            </Button>
          </div>
        </form>
        </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
