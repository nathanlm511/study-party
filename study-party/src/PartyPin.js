import React from 'react'
import { Icon } from 'semantic-ui-react'

const pinStyle={
  // backgroundColor: "white",

  borderRadius: '10px',
  transform: 'matrix(-1, 0, 0, 1, 10, 0)'
  // boxShadow: '1px 1px 1px #888888'
}

class PartyPin extends React.Component {
  render(){
    return(
      <div>
        <Icon className="user" size='big' style={pinStyle} onClick={this.props.onClick}/>
      </div>
    )
  }
}

export default PartyPin