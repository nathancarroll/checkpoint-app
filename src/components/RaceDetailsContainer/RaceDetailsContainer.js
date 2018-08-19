import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link, Redirect, Switch} from 'react-router-dom';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';

import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';
import RaceParticipants from '../RaceParticipants/RaceParticipants';
import RaceCheckpoints from '../RaceCheckpoints/RaceCheckpoints';
import RaceMap from '../RaceMap/RaceMap';
import RaceClock from '../RaceClock/RaceClock';

class RaceDetailsContainer extends Component{
    componentDidMount = () => {
        console.log('fetching detail for race', this.props.match.params.id);
        this.props.dispatch({
            type: RACE_ACTIONS.FETCH_DETAILS,
            payload: this.props.match.params.id
        })
    }

    render(){
        return(
            <div>
                <RaceDetailsNav raceID={this.props.match.params.id} />
                <RaceClock />
                <Switch>
                    <Redirect exact from={this.props.match.url} to={this.props.match.url + '/participants'} />
                    <Route exact path={this.props.match.url + '/participants'} component={RaceParticipants} />
                    <Route exact path={this.props.match.url + '/checkpoints'} component={RaceCheckpoints} />
                    <Route exact path={this.props.match.url + '/map'} component={RaceMap} />
                </Switch>
            </div>
        )
    }
};

export default connect()(RaceDetailsContainer);
