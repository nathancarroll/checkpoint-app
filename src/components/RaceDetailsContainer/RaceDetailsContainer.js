import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RACE_ACTIONS} from '../../redux/action/raceActions';

class RaceDetailsContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            raceID: this.props.match.params.id,
            raceStart: null,
            participants: [],
            checkpoints: []
        }
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: RACE_ACTIONS.FETCH_DETAILS,
            payload: this.state.raceID
        })
    }
};

export default connect()(RaceDetailsContainer);