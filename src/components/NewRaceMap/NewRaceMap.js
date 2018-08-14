import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class NewRaceMap extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     markerList: [
        //         {
        //             title: 'i am the best marker',
        //             name: 'nato3',
        //             position: {lat: 44.978185, lng: -93.081807}
        //         },{
        //             title: 'hello i am the marker',
        //             name: 'nato',
        //             position: {lat: 44.978180, lng: -93.081802}
        //         },{
        //             title: 'the owrst',
        //             name: 'potato',
        //             position: {lat: 44.978181, lng: -93.081803}
        //         }   
        // ]
        this.state = {
            markerList: []
        }
    }

    fetchCheckpoints = () => {
        console.log('fetching checkpoints');
    }

    newCheckpoint = (props, map, e) => {
        const position = {
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng()
        };
        console.log(position);
        this.setState({
            markerList: [...this.state.markerList, {
                title: 'new marker',
                name: 'nato2',
                position: position
            }]
        })
    }
    
    onMarkerClick = (props, marker, e) => {
        console.log(e);
        console.log(marker.title);
    }

    render() {
        const allMarkers = this.state.markerList.map((marker, index) => {
            return(
                <Marker
                    key={index}
                    title={marker.title}
                    name={marker.name}
                    position={marker.position}
                    onClick={this.onMarkerClick}
                />
            )
        })
        console.log(allMarkers);
        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={style}
                    initialCenter={{
                        lat: 44.978185,
                        lng: -93.081807
                    }}
                    onReady={this.fetchCheckpoints}
                    onClick={this.newCheckpoint}
                >
                    {allMarkers}
                </Map>
            </div>
        )
    }
};

export default GoogleApiWrapper({ apiKey: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw' })(NewRaceMap);

const style = {
    width: '100%',
    height: '100%'
}