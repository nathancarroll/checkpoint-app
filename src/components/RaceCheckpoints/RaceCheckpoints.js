import React, {Component} from 'react';
import RaceDetailsNav from '../RaceDetailsNav/RaceDetailsNav';
import {connect} from 'react-redux';

class RaceCheckpoints extends Component{
    raceID = this.props.match.params.id;

    componentDidMount = () => {
        console.log('hello');
        this.props.dispatch({
            type: 'FETCH_CHECKPOINTS',
            payload: this.raceID
        })
    }

    render(){
        return(
            <div>
                <RaceDetailsNav raceID={this.raceID} />
                {JSON.stringify(this.props.checkpoints)}
                <h1>hello: {this.props.match.params.id}</h1>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    checkpoints: state.race.checkpoints
})

export default connect(mapStateToProps)(RaceCheckpoints);