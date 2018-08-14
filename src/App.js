import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import RacePage from './components/RacePage/RacePage';
import RaceCheckpoints from './components/RaceCheckpoints/RaceCheckpoints';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          exact path="/register"
          component={RegisterPage}
        />
        <Route
          exact path="/user"
          component={UserPage}
        />
        <Route
          exact path="/info"
          component={InfoPage}
        />
        <Route 
          exact path="/race/:id"
          component={RacePage}
        />
        <Route
          exact path="/race/checkpoints/:id"
          component={RaceCheckpoints}
        />

        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
