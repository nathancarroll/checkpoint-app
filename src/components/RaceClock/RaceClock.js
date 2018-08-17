import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';

class RaceClock extends Component{
    constructor(props){
        super(props)
        this.state = {
            timeElapsed: null
        }
    }

    componentDidMount = () => {
        setInterval(this.update, 1000)

        // console.log(res.data);
        // console.log(moment(res.data).format('h:mm:ss'));
        // console.log('time elapsed:');
        // const duration = moment().diff(moment(res.data), 'hours')
        // console.log(duration);
        // this.setState({
        //     timeElapsed: this.props.startTime
        // })
    }

    update = () => {
        const rightNow = moment();
        this.setState({
            timeElapsed: rightNow
        })
        console.log(rightNow);
        console.log(this.props.startTime);
    }

    render(){
        return(
            <h2>{this.state.timeElapsed}</h2>
        )
    }
};

const mapStateToProps = (state) => ({
    startTime: state.race.raceDetails.startTime    
})

export default connect(mapStateToProps)(RaceClock);