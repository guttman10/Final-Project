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
        left: "50%",
    transform: "translateX(-50%)"
    }
    render() {
        return (
            <div>
                <img style={this.picture} src={require('./images/monitourLogo.png')} />
                    <div style={this.header}>
                        <NavLink exact to="/" activeStyle={this.active}>
                            Main Page
                        </NavLink>
                        <NavLink exact to="/test" activeStyle={this.active}>
                            Test
                        </NavLink>
                    </div>
            </div>
        )
    }
};
export default Header
