import React, {Component} from 'react';
import {connect} from 'react-redux';

import GoogleMapReact from 'google-map-react';
import MapCheckpoint from '../MapCheckpoint/MapCheckpoint';

let allCheckpoints;

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
                defaultCenter={{lat: 44.978185, lng: -93.081808}}
                defaultZoom={14}
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