import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const RaceDetailsNav = (props) => {
    <div className="raceDetailsNave">
        <ul>
            <li><Link to="/checkpoints">Checkpoints</Link></li>
            <li><Link to="/racers">Racers</Link></li>
            <li><Link to="/map">Map</Link></li> 
        </ul>
    </div>
}

const mapStateToProps = (state) => ({
    activeRaceID = state.race.activeRace 
})

export default connect(mapStateToProps)(RaceDetailsNav);