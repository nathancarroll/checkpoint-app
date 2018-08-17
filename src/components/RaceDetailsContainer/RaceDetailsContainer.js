import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';

import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';

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
                {JSON.stringify(this.props.race.participants)}
            </div>
        )
    }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(RaceDetailsContainer);