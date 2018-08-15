import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './NewRaceMap.css';

class Target extends Component {
    render(){
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return(
            <React.Fragment>
                <div className={showHideClassName}>
                <section className="modal-main">
                    <input name="checkpoint-name" placeholder="name" />
                    <input name="checkpoint-description" placeholder="description" />
                    <button name="cancel" onClick={this.props.onClick}>Cancel</button>
                    <button name="save" onClick={this.props.onClick}>Save</button>
                </section>
                </div>
                <h3>MARKER</h3>
            </React.Fragment>
        )
    }
}

class NewRaceMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            markerList: [],
            showModal: false
        }
    }

    fetchCheckpoints = () => {
        console.log('fetching checkpoints');
    }

    newCheckpoint = (e) => {
        if (this.state.showModal === true) return;
        this.setState({
            markerList: [...this.state.markerList, {
                lat: e.lat,
                lng: e.lng,
                text: 'new marker'
            }],
            showModal: true
        })
        console.log(e);
    }

    closeModal = (e) => {
        console.log(e.target.name);
        this.setState({
            showModal: false
        })
    }
    
    onMarkerClick(e){
        console.log('clicked on a marker');
        console.log(this);
    }

    render() {
        const allMarkers = this.state.markerList.map((marker, index) => {
            return(
                <Target
                    onClick={this.closeModal}
                    show={this.state.showModal}
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
                    options={{gestureHandling: 'greedy'}}
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