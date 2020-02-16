import React, {Component} from 'react';
import { faUserCircle, faUsers, faCog  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Toolbar.css';

const name = "Gulnaz" //pass in first name from database
const colors = ["#993365", "#FF0066", "#008001", "#FE9900", "#FE5B00"]
var category = [];

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            border: "black"
        }
    }

    toggleClass = (i) => (e) => {
        if (!this.state.classes.includes(i)) {
            this.state.classes.push(i);
        }
        else {
            this.state.classes = this.state.classes.filter(e => e !== i);
        }
        let arr = [];
        let x;
        for (x = 0; x < this.state.classes.length; x++) {
            let index = this.state.classes[x];
            arr.push(this.classes[index]);
        }
        console.log(arr);
        this.props.getChild(arr);
    }

    changeBorder = (i) => (e) => {
        
        if (this.state.border === colors[i]) {
            this.setState({border: "blue"});
            console.log(this.state.border)
        }
        else {
            this.setState({border: colors[i]});
            console.log(this.state.border)
        }
    }

    startParty = () => {
        window.location = "/party";
    }

    classes = ["Intro to Python", "General Chemistry", "Data Structures", "Vector Geometry", "Engineering Physics"]; //get array of classes from database
    
    render() {
        return (
            <div className='container'>
                <div className='top-container'>
                    <div className='profile'>
                        <FontAwesomeIcon icon={faUserCircle} style={{color: "white", fontSize: "30px"}}/>
                    </div>
                    <div className='text'>Hi {name}!</div>                    
                    <div className ='settings'>
                        <FontAwesomeIcon icon={faCog} style={{color: "white", fontSize: "30px", float: "right"}}/>
                    </div>
                </div>
                <div className='class-container'>
                    <div className='header'>
                        <span className="span-class" style={{width: "100%", textAlign: "center", fontSize: "36px", lineHeight: "44px"}}>MY CLASSES</span> 
                    </div>
                    {this.classes.map((str, i) => 
                       <div className="class" key = {i} style={{backgroundColor: colors[i], borderColor: this.state.border, borderWidth: "5px"}} >
                            {/* <input type="checkbox" value={i} checked={true} onChange={() => {this.state.checked ? category.splice(category.indexOf(str)) : category.concat(str); this.state.checked = !this.state.checked}}/> */}
                            <label htmlFor={i} className="label">
                                <input type="checkbox" id={i} className="browser-default" onClick={this.toggleClass(i)} defaultChecked/>
                                <span></span>
                            </label>
                            <span className="span-class" style={{fontSize: "36px", lineHeight: "44px"}}>{str}</span>                     
                        </div>
                    )}
                </div>
                <div className='bottom-container' style= {{alignItems: "center", padding: "36px"}}>
                    <div style={{alignItems: "center", marginBottom: "10px", textAlign: "center"}}>
                        <FontAwesomeIcon onClick={this.startParty}icon={faUsers} style={{backgroundColor: "white", color: "black", borderRadius: "50%", fontSize: "100px", padding: "5px"}}/>
                    </div>
                    <div style={{fontSize: "36px", lineHeight: "44px", width: "100%", textAlign: "center"}}>START A PARTY!</div>
                </div>
            </div>
        );
    }
}

export default Toolbar;