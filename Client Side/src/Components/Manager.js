import React, {Component} from 'react';
import Load from './Load'
import {  CircularProgressbar} from 'react-circular-progressbar';
import RTChart from 'react-rt-chart';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import './c3.css';
import ReactSpeedometer from "react-d3-speedometer"
import 'react-circular-progressbar/dist/styles.css';
import '../mdb/css/mdb.css'
import axios from "axios";
let showchart = false;
// for release
//const url = 'https://moninode.herokuapp.com/load_data';
//for testing
const url = 'http://localhost:3000/load_data';
class Manager extends Component {
    _isMounted = false;
    loginBack = {
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
    Manager = {
        height:"100%",

    }
    formStyle = {
        display:"flex",
        margin:"0 auto",
        marginLeft:"300",
        flexDirection: "column",
        marginTop:28,
        width:"30%",
    }
    titleStyle = {
        fontSize: "calc(6px + 1vw)",
    }
    infoText = {
        display:"block",
        fontSize: 25,
        fontWeight:"bold",
        color:"#d48636",
        whiteSpace: "pre-wrap",

    }
    infoWarp = {
        flex: "1 1 auto",
        textAlign: "center",
        backgroundColor:"#faf8f6"

    }
    infoImage = {
        display:"block",
        margin: "0px 00px 0 0",
        width: "100px",


    }
    charts = {
        left:200,
        display:"flex",
        height:360,
        flexDirection: "row",
        marginTop:25,
        width:"70%",
        backgroundColor:"#faf8f6"
    }
    charts2 = {

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
    chartStyle = {
        flex:1,
        textAlign:"center",
        margin:10
    }
    gaugeStyle ={
        flex:1,
        textAlign:"center",
        marginTop:80,
        //transform: "translate(0%, 23%)",
        //transform: "translateX(-50%)",
        //verflow:"hidden",
        padding:0,
    }
    headerPicture= {
        position:"relative",
        //transform: "translateX(-5%)",
        top:5,
        left:"8%",
    }
    sideBar = {
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
    sidePicture= {
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        margin:"auto",
    }
   sideText = {
        position:"relative",
        fontSize: "18",
        fontWeight:"bold",
       textAlign:"center",
       top:"78%",
        color:"#ffffff",
    }
    selectedSideBar = {
        position:"relative",
        width:"100%",
        height:"15%",
        backgroundColor:"#404c79"
    }
    unselectedSideBar = {
        position:"relative",
        width:"100%",
        height:"15%",
    }
    formsin = {
        left:"38%",
        fontSize: 13,
        display:"flex",
        flexDirection: "column",
        marginTop:18,
        width:"25%",
        backgroundColor:"#faf8f6"
    }
    formsinP = {
        fontWeight:"bold",
        textAlign:"center"
    }
    formsinB = {
        display:"flex",
        justifyContent:"center"
    }
    selectFormsIn = {
        margin:5
    }
    labelblock = {
        display:"block",
        marginTop:5
    }

    constructor(props) {
        super(props);
        this.state = {
            loads: [],
            Latitude:0,
            Longitude:0,
            GPS: 0,
            gaugeSum:0,
            counter:0,
            subAttCounter:0,
            usernameM: 'admin',
            password: '',
            error: '',
            logged:false,
            mainPage:true,
            id:0,
            category:"",
            selectName:"",
            newName:"",
            newImage:"",
            newCategory:"",
            newName3:"",
            newImage3:"",
            selectName3:"",
        }
        this.baseState = this.state
        this.nextID = this.nextID.bind(this)
        this.dataFetch = this.dataFetch.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleSubmitPost = this.handleSubmitPost.bind(this)
        this.handleSubmitPost2 = this.handleSubmitPost2.bind(this)
        this.handleSubmitPost3 = this.handleSubmitPost3.bind(this)
    }
    reset = () => {
        this.setState(this.baseState)
    }

    add({event = null, _id = null, txt = 'default title', subatt = null}){
        console.log(event,_id,txt)
        this.setState(prevState => ({
            loads: [
                ...prevState.loads,
                {_id: _id !== null ? _id : this.nextID(prevState.loads),
                    name:txt,
                    subAtt: subatt,
                }
            ]
        }))
    }
    nextID() {
        this.uniqueId = this.state.loads.length
            ? this.state.loads.length -1
            : 0
        return ++this.uniqueId
    }
   dataFetch() {
        if(this.state.logged == false) {
            window.setTimeout(this.dataFetch, 1000); /* this checks the flag every second*/
        } else {
            let GaugeSumTemp = 0
            let subAttCounter = 0
            let innercount = 0
            fetch(url)
                .then(res => res.json())
                .then(data => data.map(item => {
                    if (item.user === this.state.usernameM) {
                        for (let i = 0; i < item.subAtt.length; i++)
                            GaugeSumTemp = GaugeSumTemp + item.subAtt[i].load.currCount

                        this.add({_id: item._id, txt: item.name, subatt: item.subAtt})
                        subAttCounter = subAttCounter + item.subAtt.length
                    }
                })).catch(err => console.error(err));

            setTimeout(() => {
                showchart = true;
                if (this._isMounted) {
                    this.setState({
                        gaugeSum: GaugeSumTemp,
                        counter: this.state.loads.length,
                        subAttCounter: subAttCounter

                    })
                }
            }, 2000);

            setInterval(async () => {
                innercount = 0
                subAttCounter = 0
                let loadtemp = this.state.loads
                GaugeSumTemp = 0;
                fetch(url)
                    .then(res => res.json())
                    .then(data => data.map(item => {
                        if (item.user === this.state.usernameM) {
                            subAttCounter = subAttCounter + item.subAtt.length
                            let loadindex = loadtemp.findIndex(x => x._id == item._id);
                            if (loadindex == -1) // means a new site has been added
                            {
                                console.log("new")
                                loadtemp.push({_id: item._id, name: item.name, subAtt: item.subAtt})
                                loadindex = loadtemp.findIndex(x => x._id == item._id);
                            }
                            loadtemp[loadindex].subAtt = item.subAtt
                            innercount++
                            if (this._isMounted) {
                                if (innercount === loadtemp.length) {
                                    for(let i = 0 ; i< loadtemp.length ; i++ )
                                    {
                                        for(let j = 0 ; j < loadtemp[i].subAtt.length ; j++)
                                        {
                                                GaugeSumTemp = GaugeSumTemp + loadtemp[i].subAtt[j].load.currCount
                                        }
                                    }
                                    let gaudgeshow = GaugeSumTemp
                                    console.log({gaudgeshow},loadtemp.length , subAttCounter)
                                    GaugeSumTemp = 0
                                    this.setState({
                                        gaugeSum: gaudgeshow,
                                        counter: loadtemp.length,
                                        subAttCounter: subAttCounter
                                    })
                                }
                            }
                        }
                    })).catch(err => console.error(err));}, 5000);

        }
    }
    componentDidMount() {
        this._isMounted = true;
        if (window.navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(async location => {
                if (this._isMounted) {
                    this.setState({
                        Latitude: location.coords.latitude,
                        Longitude: location.coords.longitude,
                        GPS: 1,
                    })
                }
               this.dataFetch()
                })}}
    componentWillUnmount() {
        this._isMounted = false;
        showchart = false;
    }
    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.usernameM) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        if(this.state.usernameM === "admin" && this.state.password === "admin" || this.state.usernameM === "moshe" && this.state.password === "1234") {
            this.setState({logged: true})
        }
       else
            return this.setState({ error: 'invalid username or password' });
        return this.setState({ error: '' });
    }
    handleUserChange(evt) {
        this.setState({
            usernameM: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }
    handleIDChange = event => {
        this.setState({ id: event.target.value });
    }
    handleChangeSelect = event => {
        this.setState(({selectName: event.target.value}))
    }
    handleChangeSelect3 = event => {
        this.setState(({selectName3: event.target.value}))
    }
    handleCategoryChange = event => {
        this.setState({ category: event.target.value });
    }
    handleSubmitPost(evt) {
        evt.preventDefault();
        if(this.state.selectName == "")
            alert("Please select attraction name")
        else if(this.state.category == "")
            alert("Please don't leave fields empty")
        else {
            const user = {
                mode: 0,
                name: this.state.selectName,
                category: this.state.category
            };

            axios.post(url, {user})
                .then(res => {
                    if (res.data == "worked")
                        alert("Category has been successfully changed")
                    else
                        alert("Couldn't edit category")
                })
        }
    }

    handleNewNameChange = event => {
        this.setState({ newName: event.target.value });
    }
    handleNewNameChange3 = event => {
        this.setState({ newName3: event.target.value });
    }
    handleNewImageChange = event => {
        this.setState({ newImage: event.target.value });
    }
    handleNewImageChange3 = event => {
        this.setState({ newImage3: event.target.value });
    }
    handleNewCategoryChange = event => {
        this.setState({ newCategory: event.target.value });
    }
    handleSubmitPost2(evt) {
        console.log("posted")
        evt.preventDefault();
        if(this.state.newName == "" || this.state.newImage == "" || this.state.newCategory == "")
            alert("Please don't leave fields empty")
        else {
            const user = {
                mode: 1,
                user: this.state.usernameM,
                name: this.state.newName,
                image: this.state.newImage,
                category: this.state.newCategory,
                location: {
                    latitude: this.state.Latitude,
                    longitude: this.state.Longitude,
                },
                subAtt: [],
            };

            axios.post(url, {user})
                .then(res => {
                    if (res.data == "worked")
                        alert("New attraction has been added")
                    else
                        alert("Couldn't add a site")

                })
        }
    }
    handleSubmitPost3(evt) {
        evt.preventDefault();
        if(this.state.selectName3 == "")
            alert("Please select attraction name")
        else if(this.state.newName3 == "" || this.state.newImage3 == "")
            alert("Please don't leave fields empty")
        else {
            let name = this.state.selectName3
            let loadtemp = this.state.loads
            let loadindex = loadtemp.findIndex(x => x.name == name);
            console.log(loadindex)
            const user = {
                mode: 2,
                attName: this.state.selectName3,
                name: this.state.newName3,
                image: this.state.newImage3,
                subAtt: loadtemp[loadindex].subAtt
            };
            axios.post(url, {user})
                .then(res => {
                    if (res.data == "worked")
                        alert("New sub attraction has been added")
                    else
                        alert("Couldn't add a sub attraction")
                })
        }
    }
    render() {
        let data = {
            date: new Date(),
            Visitors: this.state.gaugeSum,
        };
        let chart = {
            axis: {
                y: {min: 0, max: 30}
            },
            point: {
                show: true
            }
        };
        if(this.state.GPS === 0)
        {
            return(
                <div>Please Enable Your Gps Position</div>
            )
        }
        else if (this.state.logged && this.state.mainPage) {
            return (
                <div className='Manager' style={this.Manager}>
                    <img style={this.headerPicture} src={require('../images/monitourLogoDash.png')}/>
                    <div style={this.sideBar}>
                        <div style={this.unselectedSideBar}>
                            <img style={this.sidePicture} src={require('../images/weblogo.png')}/>
                        </div>

                        <div style={this.selectedSideBar} onClick={() => this.setState({mainPage: true})} >
                            <img style={this.sidePicture} src={require('../images/dashboard.png')}/>
                            <p style={this.sideText}>Dashboard</p>
                        </div>
                        <div style={this.unselectedSideBar} onClick={() => this.setState({mainPage: false})}>
                            <img style={this.sidePicture} src={require('../images/add.png')}/>
                            <p style={this.sideText}>Edit/Add</p>
                        </div>
                    </div>

                    <div style={this.infoData}>
                        <div className="card" style={this.charts2}>
                            <div className="card">
                                <div className="card-body" style={this.infoWarp}>
                                    <img style={this.infoImage} src={require('../images/building2.png')}/>
                                    <p style={this.infoText}>{this.state.counter}</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body" style={this.infoWarp}>
                                    <img style={this.infoImage} src={require('../images/attracionsfinish.png')}/>
                                    <p style={this.infoText}>{this.state.subAttCounter}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={this.charts}>
                            <div  style={this.gaugeStyle}>
                                <ReactSpeedometer
                                    value={this.state.gaugeSum}
                                    needleColor="steelblue"
                                    needleTransitionDuration={4000}
                                    needleTransition="easeElastic"
                                    currentValueText="Current Overall Load: ${value}"
                                    minValue={0}
                                    maxValue={20}
                                    segments={4}
                                    customSegmentStops={[0, 5, 10, 15, 20]}
                                    segmentColors={[
                                        "#72f507",
                                        "#fff200",
                                        "#ff8c00",
                                        "#e32133",
                                    ]}

                                />
                            </div>
                            {showchart ? <div style={this.chartStyle}>
                                <p style={this.titleStyle}>Load History</p>
                                <RTChart
                                    chart={chart}
                                    fields={['Visitors']}
                                    data={data}
                                    maxValues={8}/>
                            </div> : <div className="card-body"/>}
                        </div>
                    </div>

                </div>

            )
        }
        else if (this.state.logged && !(this.state.mainPage))
        {
            let optionTemplate = this.state.loads.map(v => (
                <option value={v.name}>{v.name}</option>
            ));
            return(
                <div className='Manager' style={this.Manager}>
                    <img style={this.headerPicture} src={require('../images/monitourLogoDash.png')}/>
                    <div style={this.sideBar}>
                        <div style={this.unselectedSideBar}>
                            <img style={this.sidePicture} src={require('../images/weblogo.png')}/>
                        </div>

                        <div style={this.unselectedSideBar} onClick={() => this.setState({mainPage: true})} >
                            <img style={this.sidePicture} src={require('../images/dashboard.png')}/>
                            <p style={this.sideText}>Dashboard</p>
                        </div>
                        <div style={this.selectedSideBar} onClick={() => this.setState({mainPage: false})}>
                            <img style={this.sidePicture} src={require('../images/add.png')}/>
                            <p style={this.sideText}>Edit/Add</p>
                        </div>
                    </div>

                    <div className="card" style={this.formsin}>
                        <form onSubmit={this.handleSubmitPost}>
                            <p style={this.formsinP}>Change Attractions Category</p>
                            <label style={this.labelblock}>
                                Attraction name:
                                <select style={ this.selectFormsIn} value={this.state.value} onChange={this.handleChangeSelect}>
                                    <option disabled selected value> -- select an option -- </option>
                                    {optionTemplate}
                                </select>
                                </label>
                                <label style={this.labelblock}>
                                Category:
                                <input style={ this.selectFormsIn} type="txt" name="name" onChange={this.handleCategoryChange} />
                                </label>
                            <hr></hr>
                            <div style={this.formsinB}>
                                <button type="submit">Change</button>
                            </div>
                        </form>
                    </div>
                    <div className="card" style={this.formsin}>
                      <p style={this.formsinP}>Add New Attraction</p>
                        <form onSubmit={this.handleSubmitPost2}>
                            <label style={this.labelblock}>
                                Name:
                                <input style={{marginLeft:5}} type="text" value={this.state.newName} onChange={this.handleNewNameChange} />
                            </label>
                            <label style={this.labelblock}>
                                Image:
                                <input style={{marginLeft:5}} type="url" value={this.state.newImage} onChange={this.handleNewImageChange} />
                            </label>
                            <label style={this.labelblock}>
                                Category:
                                <input style={{marginLeft:5}} type="text" value={this.state.newCategory} onChange={this.handleNewCategoryChange} />
                            </label>
                            <hr></hr>
                            <div style={this.formsinB}>
                                <button type="submit" value="Submit">Add</button>
                            </div>
                        </form>
                    </div>
                    <div className="card" style={this.formsin}>
                        <p style={this.formsinP}>Add New Sub Attraction</p>
                        <form onSubmit={this.handleSubmitPost3}>
                            <label style={this.labelblock}>
                                Attraction Name:
                                <select style={ this.selectFormsIn} value={this.state.value} onChange={this.handleChangeSelect3}>
                                    <option disabled selected value> -- select an option -- </option>
                                    {optionTemplate}
                                </select>
                            </label>
                            <label style={this.labelblock}>
                                Name:
                                <input style={{marginLeft:5}} type="text" value={this.state.newName3} onChange={this.handleNewNameChange3} />
                            </label>
                            <label style={this.labelblock}>
                                Image:
                                <input style={{marginLeft:5}} type="text" value={this.state.newImage3} onChange={this.handleNewImageChange3} />
                            </label>
                            <hr></hr>
                            <div style={this.formsinB}>
                            <button  type="submit" value="Submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>

            );
        }
        else
        {

            return (
                <div className='Manager' style={this.loginBack}>
                    <img style={this.headerPicture} src={require('../images/monitourLogoDash.png')}/>
                    <MDBContainer>
                        <MDBRow>

                                <form onSubmit={this.handleSubmit} style={this.formStyle}>
                                    {
                                        this.state.error &&
                                        <h3 data-test="error" onClick={this.dismissError}>
                                            <button onClick={this.dismissError}>✖</button>
                                            {this.state.error}
                                        </h3>
                                    }
                                    <p className="h5 text-center mb-4" style={{color:"#ffffff"}}>Welcome</p>
                                    <div className="white-text">
                                        <MDBInput style={{color:"white"}}  label="Type your username" icon="user" group type="text" validate error="wrong"
                                                  input = "ttt"success="right" data-test="username" value={this.state.usernameM} onChange={this.handleUserChange}/>
                                        <MDBInput style={{color:"white"}} label="Type your password" icon="lock" group type="password" validate data-test="password"  value={this.state.password} onChange={this.handlePassChange}/>
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn class="btn peach-gradient" type="submit">Login</MDBBtn>
                                    </div>

                                </form>
                        </MDBRow>
                    </MDBContainer>
                </div>
            );
        }
        }


}

export default Manager;