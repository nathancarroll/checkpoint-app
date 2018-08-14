import React, {Component} from 'react';
import RaceDetailsNav from '../../components/RaceDetailsNav/RaceDetailsNav';

class RacePage extends Component{
    render(){
        return(
            <div>
                <h1>{this.props.match.params.id}</h1>
                <RaceDetailsNav raceID={this.props.match.params.id}/>
                <h1>WHAT</h1>
            </div>
        )
    }
};

export default RacePage;