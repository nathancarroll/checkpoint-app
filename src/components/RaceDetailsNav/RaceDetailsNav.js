import React from 'react';
import {Link} from 'react-router-dom';

const RaceDetailsNav = (props) => {
    const link = {
        checkpoints: '/racedetails/' + props.raceID + '/checkpoints',
        racers: '/racedetails/' + props.raceID + '/participants',
        map: '/racedetails/' + props.raceID + '/map',
    }

    return(
        <div className="raceDetailsNav">
            <ul>
                <li><Link to="/">Back</Link></li>
                <li><Link to={link.racers}>Participants</Link></li>
                <li><Link to={link.checkpoints}>Checkpoints</Link></li>
                <li><Link to={link.map}>Map</Link></li> 
            </ul>
        </div>
    )
}

export default RaceDetailsNav;