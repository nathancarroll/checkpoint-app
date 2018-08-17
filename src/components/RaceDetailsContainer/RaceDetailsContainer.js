import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link, Redirect, Switch} from 'react-router-dom';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';

import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';
import RaceParticipants from '../RaceParticipants/RaceParticipants';

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
                <Switch>
                    <Redirect exact from={this.props.match.url} to={this.props.match.url + '/participants'} />
                    <Route exact path={this.props.match.url + '/participants'} component={RaceParticipants} />
                    <Route exact path={this.props.match.url + '/checkpoints'} render={() => <h1>Checkpoints</h1>} />
                    <Route exact path={this.props.match.url + '/map'} render={() => <h1>Map</h1>} />
                </Switch>
            </div>
        )
    }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(RaceDetailsContainer);
