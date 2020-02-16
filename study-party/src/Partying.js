import React, {Component} from 'react';
import './Partying.css';
import axios from 'axios';

class Partying extends Component {

    toMap = () => {
        let id = window.localStorage.getItem("id");
        axios.delete('http://localhost:3001/api/deleteLocation', {
      data: {
        id: id,
      },
    });
        window.location = './partymap';
    }

    render() {
        return(
            <div className="background">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/hHW1oY26kxQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <button onClick={this.toMap}>End Study Session</button>
            </div>
        );
    }
}

export default Partying;