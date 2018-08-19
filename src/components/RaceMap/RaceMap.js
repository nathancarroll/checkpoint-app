import React, {Component} from 'react';
import {connect} from 'react-redux';

import GoogleMapReact from 'google-map-react';
import MapCheckpoint from '../MapCheckpoint/MapCheckpoint';

let allCheckpoints;

class RaceMap extends Component{
    render(){
        // console.log(this.props.checkpoints);
        // const allCheckpoints = this.props.checkpoints.map(checkpoint => {
        //     return(
        //         <MapCheckpoint lat={checkpoint.latitude} lng={checkpoint.longitude} />
        //     )
        // })
        return(
            <div style={{ height: '100vh', width: '100%' }}> 
            {JSON.stringify(this.props.checkpoints)}
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'}}
                defaultCenter={{lat: 44.978185, lng: -93.081808}}
                defaultZoom={14}
                options={{gestureHandling: 'greedy'}}
            >
                {/* {allCheckpoints} */}
                {/* {this.props.checkpoints.map((checkpoint) => <MapCheckpoint lat={checkpoint.latitude} lng={checkpoint.longitude} key={checkpoint.id} />)} */}
            </GoogleMapReact>
        </div>
        )
    }
};

const mapStateToProps = (state) => ({
    checkpoints: state.race.checkpoints
})

export default connect(mapStateToProps)(RaceMap);