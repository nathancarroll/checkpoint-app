import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {TextField, Button, InputAdornment} from '@material-ui/core';
import MaterialIcon from 'material-icons-react';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <h1 className="header">REGISTER</h1>
        <form id="register-form" onSubmit={this.registerUser}>
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
            <Button>
              <Link 
                to="/" 
                style={{textDecoration: 'none', color: 'black'}}>CANCEL
              </Link>
            </Button>
            <Button
              type="submit"
            >REGISTER</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

