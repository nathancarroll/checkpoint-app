import React, {Component} from 'react';
import {connect} from 'react-redux';
import { RACE_ACTIONS } from '../../redux/actions/raceActions';

class InitNewRace extends Component{
    constructor(props){
        super(props);
        this.state = {
            newRaceName: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            newRaceName: event.target.value
        })
    }

    handleSubmit = () => {
        console.log('submitting', this.state.newRaceName);
        this.props.dispatch({type: RACE_ACTIONS.POST_RACE, payload: this.state.newRaceName})
        this.setState({newRaceName: ''})
        window.location.href = '/#/race/new/map';
    }

    render(){
        return(
            <div>
                <input placeholder="name your race" value={this.state.newRaceName} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Create!</button>
            </div>
        )
    }
};

export default connect()(InitNewRace);