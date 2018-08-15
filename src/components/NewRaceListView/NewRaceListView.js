import { stringify } from "querystring";

import { race } from "redux-saga/effects";
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';

class NewRaceListView extends Component{
    componentDidMount = () => {
        this.props.dispatch({type: RACE_ACTIONS.FETCH_CHECKPOINTS, payload: this.props.match.params.id})
    }

    render(){
        const linkBack = `/race/new/map/${this.props.match.params.id}`;
        return(
            <div>
                <h3><Link to={linkBack}>MAP</Link></h3>
                {JSON.stringify(this.props.checkpointList)}
            </div>
        )
    }
};
const mapStateToProps = (state) => ({
    checkpointList: state.race.checkpoints
})

export default connect(mapStateToProps)(NewRaceListView);
