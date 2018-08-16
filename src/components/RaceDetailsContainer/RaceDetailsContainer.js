import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RACE_ACTIONS} from '../../redux/actions/raceActions';

class RaceDetailsContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            display: 'racers'
        }
    }
    componentDidMount = () => {
        console.log('fetching detail for race', this.props.match.params.id);
        this.props.dispatch({
            type: RACE_ACTIONS.FETCH_DETAILS,
            payload: this.props.match.params.id
        })
    }

    render(){
        let content;
        switch (this.state.display){
            case 'racers':
                content = JSON.stringify(this.props.race.participants);
                break;
        }
        return(
            <div><h1>hi</h1>{content}</div>
        )
    }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(RaceDetailsContainer);