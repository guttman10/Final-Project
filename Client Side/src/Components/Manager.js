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
    formStyle = {
        display:"flex",
        margin:"0 auto",
        marginLeft:"300",
        flexDirection: "column",
        marginTop:28,
        width:"30%",
    }
    listStyle  = {
        position:"relative",
        marginTop:30,
        width: 34 + 'rem',
        marginBottom: 7 + 'px',
        left: "5%",
        transform: "translateX(-5%)",
        backgroundColor:"#faf8f6"
    };
    loadBar = {
        position:"relative",
        marginLeft:"auto",
        right:0,
        width:"20%"
    };
    listcolor= {

        backgroundColor:"#faf8f6"
    };
    titleStyle = {
        fontSize: "calc(9px + 1vw)",
    }
    listText = {
        position:"absolute",
        alignItems: 'center',
        fontSize: "calc(4px + 1vw)",
        color:"#8c8a88",
        whiteSpace: "pre-wrap",
        top : "50%",
        left:"25%",
        transform: "translate(-25%, -50%)",

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
    loadPic = {
        margin: "0 auto",
        borderRadius: 100/ 9,
    };
    charts = {
        left:200,
        display:"flex",
        flexDirection: "row",
        marginTop:28,
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
    }
    gaugeStyle ={
        flex:1,
        textAlign:"center",
        marginTop:"10%",
        //transform: "translate(0%, 23%)",
        //transform: "translateX(-50%)",
        //verflow:"hidden",
        padding:0,
    }
    headerPicture= {
        position:"relative",
        //transform: "translateX(-5%)",
        top:0,
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
        position:"relative",
        display:"block",
        //transform: "translateX(-5%)",
        marginTop:30,
        marginLeft:"auto",
        marginRight:"auto",
        width:"50%"
    }
   sideText = {
        fontSize: "18",
        fontWeight:"bold",
       textAlign:"center",
        color:"#ffffff",
    }
    selectedSideBar = {
        backgroundColor:"#404c79"
    }
    formsin = {
        left:200,
        display:"flex",
        flexDirection: "column",
        marginTop:28,
        width:"70%",
        backgroundColor:"#faf8f6"
    }
    selectFormsIn = {
        margin:10
    }
    labelblock = {
        display:"block",
        marginTop:10
    }

    constructor(props) {
        super(props);
        this.state = {
            loads: [],
            gaugeSum:0,
            counter:0,
            username: '',
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
        }
        this.baseState = this.state
        this.eachLoad = this.eachLoad.bind(this)
        this.nextID = this.nextID.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmitPost = this.handleSubmitPost.bind(this)
        this.handleSubmitPost2 = this.handleSubmitPost2.bind(this)
    }
    reset = () => {
        this.setState(this.baseState)
    }

    add({event = null, _id = null, txt = 'default title', ld = 'default load', img = null}){
        this.setState(prevState => ({
            loads: [
                ...prevState.loads,
                {_id: _id !== null ? _id : this.nextID(prevState.loads),
                    name:txt,
                    load:ld,
                    image:img,

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
    componentDidMount() {
        this._isMounted = true;
        //const url = 'https://moninode.herokuapp.com/load_data'; for real use
        const url = 'http://localhost:3000/load_data';
        let GaugeSumTemp = 0
        let counter = 0
        let innercount = 0
        fetch(url)
            .then(res => res.json())
            .then(data => data.map(item => {
                    if (item.user === "admin") {
                        GaugeSumTemp = GaugeSumTemp +  (item.load.currCount)
                        this.add({_id: item._id, txt: item.name, ld: item.load, img: item.image})
                        counter = counter+1
                    }
                })).catch(err => console.error(err));

        setTimeout( () => {
            showchart = true;
            if (this._isMounted) {this.setState({
                gaugeSum: GaugeSumTemp,
                counter: counter

            })}
        }, 1000);

        setInterval( async () => {
            innercount = 0
            let loadtemp = this.state.loads
            GaugeSumTemp = 0;
            fetch(url)
                .then(res => res.json())
                .then(data => data.map(item => {
                    if (item.user === "admin") {
                        let loadindex = loadtemp.findIndex(x => x._id == item._id);
                        loadtemp[loadindex].load = item.load
                        GaugeSumTemp = GaugeSumTemp + (item.load.currCount)
                        innercount++
                        if (this._isMounted) {
                            console.log(innercount)
                            console.log(innercount)
                            if (innercount === counter) {
                                let gaudgeshow = GaugeSumTemp
                                GaugeSumTemp = 0
                                this.setState({
                                    loads: loadtemp,
                                    gaugeSum: gaudgeshow
                                })}}}})).catch(err => console.error(err));}, 5000);
    }
    componentWillUnmount() {
        this._isMounted = false;
        showchart = false;
    }
    eachLoad(name, i) {
        let currLoadCap;
        if((name.load.currCount === 0 && name.load.maxCount === 0) ||
            (name.load.currCount === 1 && name.load.maxCount === 0 ))
            currLoadCap = 0;
        else
        {
            currLoadCap = name.load.currCount/name.load.maxCount
            currLoadCap = currLoadCap.toFixed(2)}
        let predictload = parseInt(name.load.suggestion[1],10)
        return (
            <div key={`container ${i}`} className="card" style={this.listStyle}>
                <div class="card-body">
                    <Load key={`load${i}`} index={i}>
                        <h4 class="card-title" style={this.titleStyle}>{name.name} </h4>
                        <img style={this.loadPic} class="card-img-top" src={name.image}/>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" style={this.listcolor} ></li>
                            <li className="list-group-item" style={this.listcolor}>
                                <p className="font-weight-bold" style={this.listText}>Current Load:</p>
                                <div style={this.loadBar}>
                                    <CircularProgressbar value={name.load.currCount}
                                                         maxValue={name.load.maxCount}
                                                         text={`${currLoadCap*100}%`}
                                                         styles={{
                                                             path: {
                                                                 transformOrigin: "center center",
                                                                 strokeLinecap: "butt",
                                                                 stroke: currLoadCap >= 0.7 ? "#bd2327" : "#2293dd"
                                                             },
                                                             trail: {
                                                                 strokeWidth: 7
                                                             },
                                                             text: {
                                                                 fontSize: 22,
                                                                 fontWeight: 500,

                                                                 animation: "fadein 2s",
                                                                 fill: currLoadCap >= 0.7 ? "#bd2327" : "#2293dd"
                                                             }
                                                         }}

                                    />
                                </div>
                            </li>
                            <li className="list-group-item"style={this.listcolor} >
                                <p className="font-weight-bold" style={this.listText}>Predicted Load
                                    {"\n"}At {name.load.suggestion[0]}:00:</p>
                                <div style={this.loadBar}>
                                    <CircularProgressbar value={predictload}
                                                         maxValue={100}
                                                         text={`${predictload}%`}
                                                         styles={{
                                                             path: {
                                                                 transformOrigin: "center center",
                                                                 strokeLinecap: "butt",
                                                                 stroke: predictload >= 70 ? "#bd2327" : "#2293dd"
                                                             },
                                                             trail: {
                                                                 strokeWidth: 7
                                                             },
                                                             text: {
                                                                 fontSize: 22,
                                                                 fontWeight: 500,

                                                                 animation: "fadein 2s",
                                                                 fill: predictload >= 70 ? "#bd2327" : "#2293dd"
                                                             }
                                                         }}

                                    />
                                </div>
                            </li>
                            <li className="list-group-item" style={this.listcolor}/>

                        </ul>
                    </Load>
                </div>
            </div>


        )
    }
    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        if(this.state.username === "admin" && this.state.password === "admin") {
            this.setState({logged: true})
        }
        else
            return this.setState({ error: 'invalid username or password' });
        return this.setState({ error: '' });
    }
    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
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
    handleCategoryChange = event => {
        this.setState({ category: event.target.value });
    }
    handleSubmitPost(evt) {
        evt.preventDefault();

        const user = {
            mode: 0,
            name: this.state.selectName,
            category: this.state.category
        };

        axios.post(`http://localhost:3000/load_data`, { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    handleNewNameChange = event => {
        this.setState({ newName: event.target.value });
    }
    handleNewImageChange = event => {
        this.setState({ newImage: event.target.value });
    }
    handleNewCategoryChange = event => {
        this.setState({ newCategory: event.target.value });
    }
    handleSubmitPost2(evt) {
        evt.preventDefault();
        const user = {
            mode: 1,
            user:"admin",
            name: this.state.newName,
            image: this.state.newImage,
            category: this.state.newCategory,
            location: {
                latitude: 32.16,
                longitude:34.8,
            },
        };

        axios.post(`http://localhost:3000/load_data`, { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
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
        if (this.state.logged && this.state.mainPage) {
            return (
                <div className='Manager' style={this.Manager}>
                    <img style={this.headerPicture} src={require('../images/monitourLogoDash.png')}/>
                    <div style={this.sideBar}>
                        <div>
                            <img style={this.sidePicture} src={require('../images/weblogo.png')}/>
                        </div>

                        <div style={this.selectedSideBar} onClick={() => this.setState({mainPage: true})} >
                            <img style={this.sidePicture} src={require('../images/dashboard.png')}/>
                            <p style={this.sideText}>Dashboard</p>
                        </div>
                        <div onClick={() => this.setState({mainPage: false})}>
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
                                    <img style={this.infoImage} src={require('../images/warning2.png')}/>
                                    <p style={this.infoText}>0</p>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={this.charts}>
                            <div className="card-body" style={this.gaugeStyle}>
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
                            {showchart ? <div className="card-body" style={this.chartStyle}>
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
                        <div>
                            <img style={this.sidePicture} src={require('../images/weblogo.png')}/>
                        </div>

                        <div  onClick={() => this.setState({mainPage: true})} >
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
                            <p>Change Attractions Category</p>
                            <label>
                                Attraction name:
                                <div style={{display:"inline"}}>
                                <select style={ this.selectFormsIn} value={this.state.value} onChange={this.handleChangeSelect}>
                                    <option disabled selected value> -- select an option -- </option>
                                    {optionTemplate}
                                </select>
                                </div>
                                <div style={{display:"block"}}>
                                Category:
                                <input style={ this.selectFormsIn} type="txt" name="name" onChange={this.handleCategoryChange} />
                                </div>
                            </label>
                            <hr></hr>
                            <button type="submit">Change</button>
                        </form>
                    </div>
                    <div className="card" style={this.formsin}>
                      <p>Add New Attraction</p>
                        <form onSubmit={this.handleSubmitPost2}>
                            <label style={this.labelblock}>
                                Name:
                                <input style={{marginLeft:5}} type="text" value={this.state.newName} onChange={this.handleNewNameChange} />
                            </label>
                            <label style={this.labelblock}>
                                Image:
                                <input style={{marginLeft:5}} type="text" value={this.state.newImage} onChange={this.handleNewImageChange} />
                            </label>
                            <label style={this.labelblock}>
                                Category:
                                <input style={{marginLeft:5}} type="text" value={this.state.newCategory} onChange={this.handleNewCategoryChange} />
                            </label>
                            <hr></hr>
                            <button type="submit" value="Submit">Add</button>
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
                                        <MDBInput   label="Type your username" icon="user" group type="text" validate error="wrong"
                                                  input = "ttt"success="right" data-test="username" value={this.state.username} onChange={this.handleUserChange}/>
                                        <MDBInput label="Type your password" icon="lock" group type="password" validate data-test="password"  value={this.state.password} onChange={this.handlePassChange}/>
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