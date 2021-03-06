// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {

  // initialize our state
  state = {
    data: [],
    id: 0,
    lat: null,
    long: null, 
    cap: null,
    class: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
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

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getLocation')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (lat, long, cap, Class) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putLocation', {
      id: idToBeAdded,
      lat: lat,
      long: long, 
      Class: Class,
      cap: cap
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteLocation', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {;
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });
    axios.post('http://localhost:3001/api/updateLocation', {
      id: objIdToUpdate,
      update: { partying: updateToApply },
    });
  };

  getUser = ()  => {
    console.log(JSON.parse(window.localStorage.getItem('token')).email);
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
          <button onClick={this.getUser}>JWT</button>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li style={{ padding: '10px' }} key={data.lat}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> lat: </span> {dat.lat} <br />
                  <span style={{ color: 'gray' }}> long: </span> {dat.long} <br />
                  <span style={{ color: 'gray' }}> class: </span> {dat.class} <br />
                  <span style={{ color: 'gray' }}> cap: </span> {dat.cap} <br />
                  <span style={{ color: 'gray' }}> partying: </span> {dat.partying}
                </li>
              ))}
        </ul>
        <div style={{ padding: '10px' }}>
          <label>lat</label>
          <input
            type="text"
            onChange={(e) => this.setState({ lat: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <label>long</label>
          <input
            type="text"
            onChange={(e) => this.setState({ long: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <label>cap</label>
          <input
            type="text"
            onChange={(e) => this.setState({ cap: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <label>class</label>
          <input
            type="text"
            onChange={(e) => this.setState({ class: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.lat, this.state.long, this.state.cap, this.state.class)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default Test;