import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
    classes = ["CS", "Math", "Science", "Gym", "Lunch"];

    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        let options = this.classes.map((data) =>
            <option 
                key={data}
                value={data}
            >
                {data}
            </option>
        );
        
        return (
            <form noValidate onSubmit={this.onSubmit}>
              <div class="input-field col s12">
                <select className="browser-default" 
                style={{ 
                    height: "150px"
                }}
                multiple>
                <option value="" disabled>Choose your option</option>
                {options}
                </select>
                <label className="browser-default"></label>
            </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                  Login
                </button>
              </div>
            </form>
          
        );
      }
    }

export default Profile;