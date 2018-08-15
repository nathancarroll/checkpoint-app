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
                    <input name="checkpointName" placeholder="name" onChange={this.props.onChange}/>
                    <input name="checkpointDescription" placeholder="description" onChange={this.props.onChange}/>
                    <button name="cancel" onClick={this.props.onClick}>Cancel</button>
                    <button name="save" onClick={this.props.onClick}>Save</button>
                </section>
                </div>
                <h3>MARKER</h3>
            </React.Fragment>
        )
    }
}

const emptyCheckpoint = {
    lat: null,
    lng: null,
    checkpointName: '',
    checkpointDescription: ''
}

class NewRaceMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            newCheckpoint: emptyCheckpoint,
            markerList: [],
            showModal: false
        }
    }

    fetchCheckpoints = () => {
        console.log('fetching checkpoints');
    }

    handleChange = (e) => {
        console.log('changin');
        this.setState({
            newCheckpoint: {
                ...this.state.newCheckpoint,
                [e.target.name]: e.target.value
            }
        })
    }

    newCheckpoint = (e) => {
        if (this.state.showModal === true) return;
        this.setState({
            newCheckpoint: {
                ...this.state.newCheckpoint,
                lat: e.lat,
                lng: e.lng
            },
            markerList: [...this.state.markerList, {
                lat: e.lat,
                lng: e.lng,
            }],
            showModal: true
        })
        console.log(e);
    }

    closeModal = (e) => {
        console.log(e.target.name);
        if (e.target.name === 'cancel'){
            this.setState({
                newCheckpoint: emptyCheckpoint,
                markerList: this.state.markerList.slice(0, this.state.markerList.length-1)
            })
        } else if (e.target.name === 'save'){
            console.log('saving the following checkpoint to the database', this.state.newCheckpoint);
        }
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
                    onChange={this.handleChange}
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