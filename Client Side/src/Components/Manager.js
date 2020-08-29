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
import managerStyle from "./styles/managerStyle";

let showchart = false;

// for release
//const url = 'https://moninode.herokuapp.com/load_data';
//for testing
const url = 'http://localhost:3000/load_data';
class Manager extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loads: [],
            Latitude:0,
            Longitude:0,
            GPS: 0,
            gaugeSum:0,
            counter:0,
            attractionsCounter:0,
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
    add({event = null, _id = null, txt = 'default title', attraction = null}){
        console.log(event,_id,txt)
        this.setState(prevState => ({
            loads: [
                ...prevState.loads,
                {_id: _id !== null ? _id : this.nextID(prevState.loads),
                    name:txt,
                    attrations: attraction,
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
            let attractionsCounter = 0
            let innercount = 0
            fetch(url)
                .then(res => res.json())
                .then(data => data.map(item => {
                    if (item.user === this.state.usernameM) {
                        for (let i = 0; i < item.attractions.length; i++)
                            GaugeSumTemp = GaugeSumTemp + item.attractions[i].load.currCount

                        this.add({_id: item._id, txt: item.name, attractions: item.attractions})
                        attractionsCounter = attractionsCounter + item.attractions.length
                    }
                })).catch(err => console.error(err));

            setTimeout(() => {
                showchart = true;
                if (this._isMounted) {
                    this.setState({
                        gaugeSum: GaugeSumTemp,
                        counter: this.state.loads.length,
                        attractionsCounter: attractionsCounter

                    })
                }
            }, 2000);

            setInterval(async () => {
                innercount = 0
                attractionsCounter = 0
                let loadtemp = this.state.loads
                GaugeSumTemp = 0;
                fetch(url)
                    .then(res => res.json())
                    .then(data => data.map(item => {
                        if (item.user === this.state.usernameM) {
                            attractionsCounter = attractionsCounter + item.attractions.length
                            let loadindex = loadtemp.findIndex(x => x._id == item._id);
                            if (loadindex == -1) // means a new site has been added
                            {
                                console.log("new")
                                loadtemp.push({_id: item._id, name: item.name, attractions: item.attractions})
                                loadindex = loadtemp.findIndex(x => x._id == item._id);
                            }
                            loadtemp[loadindex].attractions = item.attractions
                            innercount++
                            if (this._isMounted) {
                                if (innercount === loadtemp.length) {
                                    for(let i = 0 ; i< loadtemp.length ; i++ )
                                    {
                                        for(let j = 0 ; j < loadtemp[i].attractions.length ; j++)
                                        {
                                                GaugeSumTemp = GaugeSumTemp + loadtemp[i].attractions[j].load.currCount
                                        }
                                    }
                                    let gaudgeshow = GaugeSumTemp
                                    console.log({gaudgeshow},loadtemp.length , attractionsCounter)
                                    GaugeSumTemp = 0
                                    this.setState({
                                        gaugeSum: gaudgeshow,
                                        counter: loadtemp.length,
                                        attractionsCounter: attractionsCounter
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
            alert("Please select site name")
        else if(this.state.category == "")
            alert("Please don't leave fields empty")
        else {
            const sentData = {
                mode: 0,
                name: this.state.selectName,
                category: this.state.category
            };

            axios.post(url, {sentData})
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
            const sentData = {
                mode: 1,
                user: this.state.usernameM,
                name: this.state.newName,
                image: this.state.newImage,
                category: this.state.newCategory,
                location: {
                    latitude: this.state.Latitude,
                    longitude: this.state.Longitude,
                },
                attractions: [],
            };

            axios.post(url, {sentData})
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
            alert("Please select site name")
        else if(this.state.newName3 == "" || this.state.newImage3 == "")
            alert("Please don't leave fields empty")
        else {
            let name = this.state.selectName3
            let loadtemp = this.state.loads
            let loadindex = loadtemp.findIndex(x => x.name == name);
            console.log(loadindex)
            const sentData = {
                mode: 2,
                attName: this.state.selectName3,
                name: this.state.newName3,
                image: this.state.newImage3,
                attractions: loadtemp[loadindex].attractions
            };
            axios.post(url, {sentData})
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
                <div className='Manager' style={managerStyle.Manager}>
                    <img style={managerStyle.headerPicture} src={require('../images/monitourLogoDash.png')}/>
                    <div style={managerStyle.sideBar}>
                        <div style={managerStyle.unselectedSideBar}>
                            <img style={managerStyle.sidePicture} src={require('../images/weblogo.png')}/>
                        </div>

                        <div style={managerStyle.selectedSideBar} onClick={() => this.setState({mainPage: true})} >
                            <img style={managerStyle.sidePicture} src={require('../images/dashboard.png')}/>
                            <p style={managerStyle.sideText}>Dashboard</p>
                        </div>
                        <div style={managerStyle.unselectedSideBar} onClick={() => this.setState({mainPage: false})}>
                            <img style={managerStyle.sidePicture} src={require('../images/add.png')}/>
                            <p style={managerStyle.sideText}>Edit/Add</p>
                        </div>
                    </div>

                    <div style={managerStyle.infoData}>
                        <div className="card" style={managerStyle.charts2}>
                            <div className="card">
                                <div className="card-body" style={managerStyle.infoWarp}>
                                    <img style={managerStyle.infoImage} src={require('../images/building2.png')}/>
                                    <p style={managerStyle.infoText}>{this.state.counter}</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body" style={managerStyle.infoWarp}>
                                    <img style={managerStyle.infoImage} src={require('../images/attracionsfinish.png')}/>
                                    <p style={managerStyle.infoText}>{this.state.attractionsCounter}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={managerStyle.charts}>
                            <div  style={managerStyle.gaugeStyle}>
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
                            {showchart ? <div style={managerStyle.chartStyle}>
                                <p style={managerStyle.titleStyle}>Load History</p>
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
                <div className='Manager' style={managerStyle.Manager}>
                    <img style={managerStyle.headerPicture} src={require('../images/monitourLogoDash.png')}/>
                    <div style={managerStyle.sideBar}>
                        <div style={managerStyle.unselectedSideBar}>
                            <img style={managerStyle.sidePicture} src={require('../images/weblogo.png')}/>
                        </div>

                        <div style={managerStyle.unselectedSideBar} onClick={() => this.setState({mainPage: true})} >
                            <img style={managerStyle.sidePicture} src={require('../images/dashboard.png')}/>
                            <p style={managerStyle.sideText}>Dashboard</p>
                        </div>
                        <div style={managerStyle.selectedSideBar} onClick={() => this.setState({mainPage: false})}>
                            <img style={managerStyle.sidePicture} src={require('../images/add.png')}/>
                            <p style={managerStyle.sideText}>Edit/Add</p>
                        </div>
                    </div>

                    <div className="card" style={managerStyle.formsin}>
                        <form onSubmit={this.handleSubmitPost}>
                            <p style={managerStyle.formsinP}>Change Site Category</p>
                            <label style={managerStyle.labelblock}>
                                Site name:
                                <select style={ this.FormsInput} value={this.state.value} onChange={this.handleChangeSelect}>
                                    <option disabled selected value> -- select an option -- </option>
                                    {optionTemplate}
                                </select>
                                </label>
                                <label style={managerStyle.labelblock}>
                                Category:
                                <input style={ this.FormsInput} type="txt" name="name" onChange={this.handleCategoryChange} />
                                </label>
                            <hr></hr>
                            <div style={managerStyle.formsinB}>
                                <button type="submit">Change</button>
                            </div>
                        </form>
                    </div>
                    <div className="card" style={managerStyle.formsin}>
                      <p style={managerStyle.formsinP}>Add New Site</p>
                        <form onSubmit={this.handleSubmitPost2}>
                            <label style={managerStyle.labelblock}>
                                Name:
                                <input style={ this.FormsInput}  type="text" value={this.state.newName} onChange={this.handleNewNameChange} />
                            </label>
                            <label style={managerStyle.labelblock}>
                                Image:
                                <input style={ this.FormsInput}  type="url" value={this.state.newImage} onChange={this.handleNewImageChange} />
                            </label>
                            <label style={managerStyle.labelblock}>
                                Category:
                                <input style={ this.FormsInput}  type="text" value={this.state.newCategory} onChange={this.handleNewCategoryChange} />
                            </label>
                            <hr></hr>
                            <div style={managerStyle.formsinB}>
                                <button type="submit" value="Submit">Add</button>
                            </div>
                        </form>
                    </div>
                    <div className="card" style={managerStyle.formsin}>
                        <p style={managerStyle.formsinP}>Add New Attractions</p>
                        <form onSubmit={this.handleSubmitPost3}>
                            <label style={managerStyle.labelblock}>
                                Site Name:
                                <select style={ this.FormsInput} value={this.state.value} onChange={this.handleChangeSelect3}>
                                    <option disabled selected value> -- select an option -- </option>
                                    {optionTemplate}
                                </select>
                            </label>
                            <label style={managerStyle.labelblock}>
                                Name:
                                <input style={ this.FormsInput}  type="text" value={this.state.newName3} onChange={this.handleNewNameChange3} />
                            </label>
                            <label style={managerStyle.labelblock}>
                                Image:
                                <input style={ this.FormsInput}  type="text" value={this.state.newImage3} onChange={this.handleNewImageChange3} />
                            </label>
                            <hr></hr>
                            <div style={managerStyle.formsinB}>
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
                <div className='Manager' style={managerStyle.loginBack}>
                    <img style={managerStyle.headerPicture} src={require('../images/monitourLogoDash.png')}/>
                    <MDBContainer>
                        <MDBRow>

                                <form onSubmit={this.handleSubmit} style={managerStyle.formStyle}>
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