import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';

class RaceClock extends Component{
    constructor(props){
        super(props)
        this.state = {
            timeElapsed: 0
        }
    }

    componentDidMount = () => {
        setInterval(this.update, 1000)
        // this.props.dispatch({
        //     type: RACE_ACTIONS.FETCH_TIME,
        //     payload: this.props.raceID
        // })
        axios.get(`/api/race/time/${this.props.raceID}`)
            .then((res) => {
                console.log(res.data);
                console.log(moment(res.data).format('h:mm:ss'));
                console.log('time elapsed:');
                const duration = moment().diff(moment(res.data), 'hours')
                console.log(duration);
            })
            .catch((err) => {
                console.log('error during axios get', err);
                return;
            })
    }

    update = () => {
        const timeElapsed = moment().format('h:mm:ss');
        this.setState({
            timeElapsed: timeElapsed
        })
    }

    render(){
        return(
            <h2>{this.state.timeElapsed}</h2>
        )
    }
};

export default connect()(RaceClock);