import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Profile extends Component {
    classes = ["CS", "Math", "Science", "Gym", "Lunch"];

    constructor(props) {
        super(props);
        this.state = {value: [""]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange (e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
            value.push(options[i].value);
            }
        }
        this.setState({value: value});

        
      }

      handleSubmit(event) {
        alert(this.state.value);
        event.preventDefault();
        
        window.localStorage.setItem("classes", JSON.stringify(this.state.value));
        window.location = "/test";

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
            <form noValidate onSubmit={this.handleSubmit}>
              <div class="input-field col s12">
                <select className="browser-default" 
                onChange={this.handleChange}
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