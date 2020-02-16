import React, {Component} from 'react';
import axios from 'axios';

class Party extends Component {
    constructor() {
        super();
        this.state = {
          Class: "",
          cap: "",
          lat: "",
          long: ""
        };
      }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit = e => {
        e.preventDefault();
    const newLocation = {
          id: 99,          
          lat: this.state.lat,
          long: this.state.long,
          Class: this.state.Class,
          cap: this.state.cap
        };
        
        axios.post('http://localhost:3001/api/putLocation', newLocation)
        .then(res => {
            window.location='./partying'
        }) // re-direct to login on successful register
        .catch(err => console.log("register error"));
        console.log(newLocation);
      };

    render() {
        return (
            <div>
                <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Party</b> info
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Class}
                  id="Class"
                  type="text"
                />
                <label htmlFor="Class">Class</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.cap}
                  id="cap"
                  type="text"
                />
                <label htmlFor="cap">Capacity</label>
                </div>  
                <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lat}
                  id="lat"
                  type="text"
                />
                <label htmlFor="lat">Latitude</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.long}
                  id="long"
                  type="text"
                />
                <label htmlFor="long">Longitude</label>
                </div>  
             
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Study 
                </button>                
                        
            </form>
            
          </div>
        </div>
        </div>
        );
    }
}

export default Party;