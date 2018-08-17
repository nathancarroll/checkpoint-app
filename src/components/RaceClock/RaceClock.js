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
        const rightNow = moment().format();
        // this.setState({
        //     timeElapsed: rightNow
        // })
        const duration = moment().diff(this.props.startTime)
        this.setState({
            timeElapsed: duration
        })
    }

    formatRaceTime = (duration) => {
        const s = Math.floor( (duration/1000) % 60 );
        const m = Math.floor( (duration/1000/60) % 60 );
        const h = Math.floor(duration/(1000*60*60));
        return `${h}:${m}:${s}`; 
    }

    render(){
        let content = 'FINISHED'
        if (!this.props.race.finishTime){
            content = this.formatRaceTime(this.state.timeElapsed)
        }
        return(
            <h2>{content}</h2>
        )
    }
};

const mapStateToProps = (state) => ({
    race: state.race.raceDetails    
})

export default connect(mapStateToProps)(RaceClock);