import React from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';

const RaceDetailsNav = (props) => {
    const link = {
        checkpoints: '/race/checkpoints/' + props.raceID,
        racers: '/race/racers/' + props.raceID,
        map: '/race/map/' + props.raceID,
    }

    return(
        <div className="raceDetailsNav">
            <ul>
                <li><Link to={link.checkpoints}>Checkpoints</Link></li>
                <li><Link to={link.racers}>Racers</Link></li>
                <li><Link to={link.map}>Map: {props.raceID}</Link></li> 
            </ul>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     activeRaceID: state.race.activeRace 
// })

// export default connect(mapStateToProps)(RaceDetailsNav);

export default RaceDetailsNav;