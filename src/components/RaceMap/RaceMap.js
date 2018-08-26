import React, {Component} from 'react';
import {connect} from 'react-redux';

import GoogleMapReact from 'google-map-react';
import MapCheckpoint from '../MapCheckpoint/MapCheckpoint';

class RaceMap extends Component{

    render(){
        let allCheckpoints = [];
        if (this.props.checkpoints){
            allCheckpoints = this.props.checkpoints.map(checkpoint => {
                return(
                    <MapCheckpoint key={checkpoint.id} lat={checkpoint.latitude} lng={checkpoint.longitude} />
                )
            });
        }

        return(
            <div className="map-container" style={{ height: '70vh', width: '95vw'}}> 
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'}}
                defaultCenter={{lat: 44.977055, lng: -93.265884}}
                defaultZoom={13}
                options={{gestureHandling: 'greedy'}}
            >
                {allCheckpoints}
            </GoogleMapReact>
        </div>
        )
    }
};

const mapStateToProps = (state) => ({
    checkpoints: state.race.checkpoints
})

export default connect(mapStateToProps)(RaceMap);