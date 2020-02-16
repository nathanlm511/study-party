import React, {Component} from 'react';
import './Toolbar.css';

class Toolbar extends Component {

    classes = ["CS", "Math", "Science", "Gym", "Lunch"];

    render() {
        return (
            <div className='container'>
                <div className='top-container'>
                    <div className='profile'></div>
                    <div className='text'>HI PERSON :)</div>                    
                    <div className ='settings'></div>
                </div>
                <div className='class-container'>
                    {this.classes.map((str, i) => <div className="class" key = {i}>
                    <label htmlFor={i} className="label">
                    <input type="checkbox" id={i} className="browser-default"/>
                    <span></span></label>  
                    <span className="span-class">{str}</span>                     
                        
                        </div>)}
                </div>
                <div className='bottom-container'></div>
                
            </div>
        );
    }
}

export default Toolbar;