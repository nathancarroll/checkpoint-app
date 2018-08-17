import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router-dom';

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
                <h3><Link to={this.props.match.url + '/what'}>WHAT</Link></h3>
                <Route path={this.props.match.url + '/what'} render={() => <h1>hello</h1>} />
            </div>
        )
    }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(RaceDetailsContainer);
