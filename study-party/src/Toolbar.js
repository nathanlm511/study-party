import React, {Component} from 'react';
import { faUserCircle, faUsers, faCog  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import './Toolbar.css';

const name = "Gulnaz" //pass in first name from database
const colors = ["#993365", "#FF0066", "#008001", "#FE9900", "#FE5B00"]
var category = [];

class Toolbar extends Component {
    constructor() {
        super();
        this.state = {
            border: "black"
        }
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
                       <div className="class" key = {i} style={{backgroundColor: colors[i], borderColor: this.state.border, borderWidth: "5px"}} onClick={this.changeBorder(i)}>
                            <Checkbox
                                icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />}
                                label={str}
                            />
                            <span className="span-class" style={{fontSize: "36px", lineHeight: "44px"}}>{str}</span>                     
                        </div>
                    )}
                </div>
                <div className='bottom-container' style= {{alignItems: "center", padding: "36px"}}>
                    <div style={{alignItems: "center", marginBottom: "10px", textAlign: "center"}}>
                        <FontAwesomeIcon icon={faUsers} style={{backgroundColor: "white", color: "black", borderRadius: "50%", fontSize: "100px", padding: "5px"}}/>
                    </div>
                    <div style={{fontSize: "36px", lineHeight: "44px", width: "100%", textAlign: "center"}}>START A PARTY!</div>
                </div>
            </div>
        );
    }
}

export default Toolbar;