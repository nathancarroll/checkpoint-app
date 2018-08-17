import React from 'react';
import {Link} from 'react-router-dom';

const RaceDetailsNav = (props) => {
    const link = {
        checkpoints: '/race/checkpoints/' + props.raceID,
        racers: '/race/racers/' + props.raceID,
        map: '/race/map/' + props.raceID,
    }

    return(
        <div className="raceDetailsNav">
            <ul>
                <li><Link to="/">Back</Link></li>
                <li><Link to={link.checkpoints}>Checkpoints</Link></li>
                <li><Link to={link.racers}>Racers</Link></li>
                <li><Link to={link.map}>Map</Link></li> 
            </ul>
        </div>
    )
}

export default RaceDetailsNav;