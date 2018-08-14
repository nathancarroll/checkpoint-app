import React, { Component } from 'react';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

class Target extends Component {
    render(){
        return(
            // <div height='10px' width='10px' backgroundcolor='red' />
            <h3>MARKER</h3>
        )
    }
}

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

    newCheckpoint = (e) => {
        // const position = {
        //     latitude: e.latLng.lat(),
        //     longitude: e.latLng.lng()
        // };
        // console.log(position);
        // this.setState({
        //     markerList: [...this.state.markerList, {
        //         title: 'new marker',
        //         name: 'nato2',
        //         position: position
        //     }]
        // })
        this.setState({
            markerList: [...this.state.markerList, {
                lat: e.lat,
                lng: e.lng,
                text: 'new marker'
            }]
        })
        console.log(e);
    }
    
    onMarkerClick = (e) => {
        console.log('click');
        console.log(e);
    }

    render() {
        const allMarkers = this.state.markerList.map((marker, index) => {
            return(
                <Target
                    key={index}
                    {...marker}
                />
            )
        })
        console.log(allMarkers);
        return (
            <div style={{ height: '100vh', width: '100%' }}> 
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'}}
                    defaultCenter={{lat: 44.978185, lng: -93.081808}}
                    defaultZoom={14}
                    onChildClick={this.onMarkerClick}
                    onClick={this.newCheckpoint}
                >
                    {/* <Target
                        lat={44.978182}
                        lng={-93.081806}
                        text={'nato potato'}
                    /> */}
                    {allMarkers}
                </GoogleMapReact>
            </div>
        )
    }
};

export default NewRaceMap;

// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key:'AIzaSyBfp9E-IfhLx-7zsoW5i79uFXAl63KMJbw'}}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={59.955413}
//             lng={30.337844}
//             text={'Kreyser Avrora'}
//           />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default SimpleMap;