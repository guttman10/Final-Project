import React, { Component } from "react";

class managerStyle extends Component {
    static loginBack = {
        background:"linear-gradient(rgba(250,0,0,0.5),transparent)",
        backgroundColor:"#ffbc78", /*this your primary color*/
        minHeight: "100%",
        minWidth: "1024px",

        /* Set up proportionate scaling */
        width: "100%",
        height: "auto",

        /* Set up positioning */
        position: "fixed",
        top: 0,
        left: 0,
    };
    static Manager = {
        height:"100%",

    }
    static formStyle = {
        display:"flex",
        margin:"0 auto",
        marginLeft:"300",
        flexDirection: "column",
        marginTop:28,
        width:"30%",
    }
    static titleStyle = {
        fontSize: "calc(6px + 1vw)",
    }
    static infoText = {
        display:"block",
        fontSize: 25,
        fontWeight:"bold",
        color:"#d48636",
        whiteSpace: "pre-wrap",

    }
    static infoWarp = {
        flex: "1 1 auto",
        textAlign: "center",
        backgroundColor:"#faf8f6"

    }
    static infoImage = {
        display:"block",
        margin: "0px 00px 0 0",
        width: "100px",


    }
    static charts = {
        left:200,
        display:"flex",
        height:360,
        flexDirection: "row",
        marginTop:25,
        width:"70%",
        backgroundColor:"#faf8f6"
    }
    static charts2 = {
        display:"flex",
        flexDirection: "row",
        marginTop:28,
        width:280,
        margin:"0 auto",
        right:"3%",
        transform: "translateX(-3%)",
        marginBottom:"-1%",
        backgroundColor:"#faf8f6"
    }
    static chartStyle = {
        flex:1,
        textAlign:"center",
        margin:10
    }
    static gaugeStyle ={
        flex:1,
        textAlign:"center",
        marginTop:80,
        //transform: "translate(0%, 23%)",
        //transform: "translateX(-50%)",
        //verflow:"hidden",
        padding:0,
    }
    static headerPicture= {
        position:"relative",
        //transform: "translateX(-5%)",
        top:5,
        left:"8%",
    }
    static sideBar = {
        position:"absolute",
        display:"flex",
        flexDirection: "column",
        left:0,
        top:0,
        height:"100%",
        overflow:"hidden",
        width:"7%",
        backgroundColor:"#2c3652"
    }
    static sidePicture= {
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        margin:"auto",
    }
    static sideText = {
        position:"relative",
        fontSize: "18",
        fontWeight:"bold",
        textAlign:"center",
        top:"78%",
        color:"#ffffff",
    }
    static selectedSideBar = {
        position:"relative",
        width:"100%",
        height:"15%",
        backgroundColor:"#404c79"
    }
    static unselectedSideBar = {
        position:"relative",
        width:"100%",
        height:"15%",
    }
    static formsin = {
        left:"38%",
        fontSize: 13,
        display:"flex",
        flexDirection: "column",
        marginTop:18,
        width:"25%",
        backgroundColor:"#faf8f6"
    }
    static formsinP = {
        fontWeight:"bold",
        textAlign:"center"
    }
    static formsinB = {
        display:"flex",
        justifyContent:"center"
    }
    static FormsInput = {
        float:"right",
        height:23,
        width:240
    }
    static labelblock = {
        fontWeight:"bold",
        display:"block",
        marginTop:10
    }
}

export default managerStyle