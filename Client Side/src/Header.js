import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class Header extends Component {
    active = {
        backgroundColor: "#212F3D",
        color:"white",
        fontWeight:"bold",
    };
    header= {
        listStyle:"none",
        display:"flex",
        justifyContent:"space-evenly",
    };
    picture= {
        position:"relative",
        left: "-5%",
    //transform: "translateX(-5%)",
        top:0
    }
    render() {
        return (
            <div>
                <img style={this.picture} src={require('./images/monitourLogoSmall.png')} />
            </div>
        )
    }
};
export default Header
