import React, { Component } from 'react'
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api'
import { Marker } from '@react-google-maps/api';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './PartyMap.css';
import axios from 'axios';
import Toolbar from "./Toolbar";

class PartyMap extends Component {

    constructor() {
        super();
        this.state = {
            modalOn: false,
            data: [],
            intervalIsSet: false,
            windowLoc: {lat: -100, lng: 100},
            cap: 1,
            partying: 1,
            id: 0
        };
    }

    mapContainerStyle = {
    height: "100vh",
    width: "80vw"
    }

    out = {
      lat: -100, 
      lng: 100
    }

    center = {
        lat: 37.2274,
        lng: -80.4222
    }

    position = {
    lat: 37.772,
    lng: -122.214
    }

    onLoad = marker => {
        console.log('marker: ', marker)
    }

    onClick = (cap, partying, id) => e => {
        this.setState({modalOn: true});
        this.setState({windowLoc: this.center});
        this.setState({cap: cap});
        this.setState({partying: partying});
        this.setState({id: id});
        console.log('EER');
    }

    toggle = () => {
        this.setState({modalOn: false});
    }

    componentDidMount() {
        this.getLocations();
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval });
        }
      }
    
      // never let a process live forever
      // always kill a process everytime we are done using it
      componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
      }


    getLocations = () => {
        fetch('http://localhost:3001/api/getLocation')
          .then((data) => data.json())
          .then((res) => this.setState({ data: res.data }))
      };

      dict = {
          "Computer Science": 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          "Math": 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
          "Science": 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          "English": 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          "History": 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
      }


      divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15
      }

      cancel = () => {
        this.setState({windowLoc: this.out});
      }

      party = () => {
        console.log(this.state.id);
        this.updateDB(this.state.id, this.state.partying + 1);
        this.setState({windowLoc: this.out});
        if (this.state.cap == this.state.partying + 1) {
          axios.delete('http://localhost:3001/api/deleteLocation', {
          data: {
            id: this.state.id
          },
        });
        }
        window.location.reload();
      }  
      
      updateDB = (idToUpdate, updateToApply) => {
        axios.post('http://localhost:3001/api/updateLocation', {
          id: idToUpdate,
          update: { partying: updateToApply },
        });
      };

  render() {
     return (
         <div className="map-container">
      <Modal isOpen={this.state.modalOn} toggle={this.toggle} className="browser-default map-modal">
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyCaqVioGFgalHGpuZfmtB-_v2-UU2vkE3s"
      >
        <GoogleMap
          id="marker-example"
          mapContainerStyle={this.mapContainerStyle}
          zoom={16}
          center={this.center}
          clickableIcons={false}>
              <InfoWindow
                position={this.state.windowLoc}
                options={{disableAutoPan: true}}
              >
                <div style={this.divStyle}>
                  <button onClick={this.party}>PARTY!</button>
                  <button onClick={this.cancel}>Cancel</button>
                  <h1>{this.state.partying} / {this.state.cap}</h1>
                </div>
              </InfoWindow>
              {this.state.data.map
              ((dat) => (
                <Marker key={dat.lat}
                onLoad={this.onLoad}
                position={{lat: dat.lat, lng: dat.long}}
                onClick ={this.onClick(dat.cap, dat.partying, dat._id)}
                icon = {this.dict[dat.class]}
              />
              ))}
              
        </GoogleMap>
      </LoadScript>
      <Toolbar></Toolbar>
      </div>
     )
  }
}

export default PartyMap;