import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import RaceCheckpoints from './components/RaceCheckpoints/RaceCheckpoints';
import RaceParticipants from './components/RaceParticipants/RaceParticipants';
import CreateRaceContainer from './components/CreateRaceContainer/CreateRaceContainer';
import RaceDetailsContainer from './components/RaceDetailsContainer/RaceDetailsContainer';

import './styles/main.css';

const App = () => (
  <div>
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
          exact path="/race/:id"
          render={(props) => {
            const link='/race/racers/' + props.match.params.id;
            return(
              <Redirect to={link} />
            )
          }}
        />
        <Route
          exact path="/race/checkpoints/:id"
          component={RaceCheckpoints}
        />
        <Route
          exact path="/race/racers/:id"
          component={RaceParticipants}
        />
        <Route
          exact path="/newrace"
          component={CreateRaceContainer}
        />
        <Route
          path="/racedetails/:id"
          component={RaceDetailsContainer}
        />
        <Route render={() => <h1>404</h1>} />
        </Switch>
    </Router>
  </div>
);

export default App;
