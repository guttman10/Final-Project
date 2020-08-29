import React, { Component } from "react";

class visitorStyle extends Component {
    static listStyle  = {
        display: "flex",
        alignItems: "stretch",
        marginTop:10,
        width:"95%",
        marginBottom: 7 + 'px',
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor:"#faf8f6"
    };
    static loadBar = {
        position:"relative",
        marginLeft:"auto",
        right:0,
        width:"20%"
    };
    static titleStyle = {
        fontSize: "calc(19px + 1vw)",
    }
    static listText = {
        position:"absolute",
        alignItems: 'center',
        fontSize: "calc(14px + 1vw)",
        color:"#8c8a88",
        whiteSpace: "pre-wrap",
        top : "50%",
        left:"25%",
        transform: "translate(-25%, -50%)",
    };
    static listcolor= {

        backgroundColor:"#faf8f6"
    };
    static greetext = {
        fontSize: "calc(14px + 1vw)",
        color:"#8c8a88",
        marginTop:"5%",
        marginBottom:"3%",
        textAlign: "center",
    }
    static loadPic = {
        position:"relative",
        marginTop:30,
        marginBottom: 7 + 'px',
        left: "50%",
        transform: "translateX(-50%)",
        height:"60%",
        width:"60%",
        borderRadius: 100/ 9,
    };
    static headerPicture= {
        position:"relative",
        //transform: "translateX(-5%)",
        top:0
    }
    static searchStyle = {
        margin: "0 auto",
        display: "block",
        padding: 10,
        textAlign: "center",
        borderRadius: 100/ 4,
    }
    static buttonStyle= {
        position:"relative",
        textAlign:"center",
        fontSize: "calc(9px + 1vw)",
        top:"50%",
        left:"50%",
        transform: "translate(-50%, -50%)",
        marginTop:"13%",
        textTransform: "none"
    }
}

export default visitorStyle