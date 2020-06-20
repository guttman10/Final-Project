import React, {Component} from 'react';
import Load from './Load'
import {MdAdd} from 'react-icons/md'
import {  CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import moment from "moment"
import 'moment/locale/en-il'
class Tourist extends Component {
    hasUnmounted = false;
    _isMounted = false;
    listStyle  = {
        display: "flex",
        alignItems: "stretch",
        marginTop:10,
        width:"95%",
        marginBottom: 7 + 'px',
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor:"#faf8f6"
    };
    loadBar = {
        position:"relative",
        marginLeft:"auto",
        right:0,
        width:"20%"
    };
    titleStyle = {
        fontSize: "calc(19px + 1vw)",
    }
    listText = {
        position:"absolute",
        alignItems: 'center',
        fontSize: "calc(14px + 1vw)",
        color:"#8c8a88",
        whiteSpace: "pre-wrap",
        top : "50%",
        left:"25%",
        transform: "translate(-25%, -50%)",
    };
    listcolor= {

        backgroundColor:"#faf8f6"
    };
    greetext = {
        fontSize: "calc(14px + 1vw)",
        color:"#8c8a88",
        marginTop:"5%",
        marginBottom:"3%",
        textAlign: "center",
    }
    loadPic = {
        position:"relative",
        marginTop:30,
        marginBottom: 7 + 'px',
        left: "50%",
        transform: "translateX(-50%)",
        height:"60%",
        width:"60%",
        borderRadius: 100/ 9,
    };
    headerPicture= {
        position:"relative",
        //transform: "translateX(-5%)",
        top:0
    }
    searchStyle = {
        margin: "0 auto",
        display: "block",
        padding: 10,
        textAlign: "center",
        borderRadius: 100/ 4,
    }
    buttonStyle= {
        position:"relative",
        textAlign:"center",
        fontSize: "calc(9px + 1vw)",
        top:"50%",
        left:"50%",
        transform: "translate(-50%, -50%)",
        marginTop:"13%",
        textTransform: "none"
    }

    constructor(props) {
        super(props);
        this.state = {
            loads: [],
            Latitude:0,
            Longitude:0,
            GPS:0,
            searchString: "",
            expend:"",
        }
        this.baseState = this.state
        this.eachLoad = this.eachLoad.bind(this)
        this.nextID = this.nextID.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
    reset = () => {
        this.setState(this.baseState)

    }
    add({event = null, _id = null, txt = 'default title', ld = 'default load', img = null, loc = null, cate = null, subatt = null}){
        console.log(event,_id,txt,ld,img,loc,cate)
        this.setState(prevState => ({
            loads: [
                ...prevState.loads,
                {_id: _id !== null ? _id : this.nextID(prevState.loads),
                    name:txt,
                    load:ld,
                    image:img,
                    location:loc,
                    subAtt: subatt,
                    category:cate,
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
        let counter = 0
        let innercount = 0
        if (window.navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(async location => {
                if (this._isMounted) {
                    this.setState({
                        Latitude: location.coords.latitude,
                        Longitude: location.coords.longitude,
                        GPS: 1})}

                // for release
                //const url = 'https://moninode.herokuapp.com/load_data';
                //for testing
                const url = 'http://localhost:3000/load_data';
                fetch(url)
                    .then(res => res.json())
                    .then(data => data.map(item => {
                        if ((Math.abs(item.location.latitude - this.state.Latitude) <= 0.01) &&
                            (Math.abs(this.state.Latitude - item.location.latitude) <= 0.01)) {
                            this.add(
                                {_id: item._id, txt: item.name, img: item.image,cate: item.category, subatt: item.subAtt})}}))
                    .catch(err => console.error(err));
                setInterval(async () => {
                    innercount = 0
                    let loadtemp = this.state.loads
                    fetch(url)
                        .then(res => res.json())
                        .then(data => data.map(item => {
                            if (this._isMounted) {
                                if ((Math.abs(item.location.latitude - this.state.Latitude) <= 0.01) &&
                                    (Math.abs(this.state.Latitude - item.location.latitude) <= 0.01)) {
                                    let loadindex = loadtemp.findIndex(x => x._id == item._id);
                                    if(loadindex == -1) // means a new site has been added
                                    {
                                        loadtemp.push({_id: item._id, name: item.name, image: item.image,category: item.category, subAtt: item.subAtt})
                                        loadindex = loadtemp.findIndex(x => x._id == item._id);
                                    }
                                    loadtemp[loadindex].category = item.category
                                    loadtemp[loadindex].subAtt = item.subAtt
                                    innercount++
                                    if (this._isMounted) {
                                        if (innercount === loadtemp.length) {
                                            this.setState({
                                                loads: loadtemp
                                            })}};}}})).catch(err => console.error(err));}, 5000);})}}
    componentWillUnmount() {
        this._isMounted = false;
    }
    eachLoad(name, i) {
        moment.locale("en-il");
        let innercurrLoadCap = 0;
        let sumcurrload = 0;
        let summaxload = 0;
        let sumloadcap = 0;
        let sumpreditload = 0;
        let subAttCount = name.subAtt.length
        if(name._id === this.state.expend)
        {
             innercurrLoadCap = 0;
             sumcurrload = 0;
             summaxload = 0;
             sumloadcap = 0;
             sumpreditload = 0;
            const buffer = []
            for(let i = 0 ; i< subAttCount ; i++)
            {
                if((name.subAtt[i].load.currCount === 0 && name.subAtt[i].load.maxCount === 0) ||
                    (name.subAtt[i].load.currCount === 1 && name.subAtt[i].load.maxCount === 0 ))
                    innercurrLoadCap = 0;
                else
                    innercurrLoadCap = (name.subAtt[i].load.currCount/name.subAtt[i].load.maxCount).toFixed(2)


                let innerpredictload = parseInt(name.subAtt[i].load.suggestion[1],10)
                sumpreditload += innerpredictload

                sumcurrload += name.subAtt[i].load.currCount
                summaxload += name.subAtt[i].load.maxCount
                buffer.push(
                    <div>
                    <h4 className="card-title" style={this.titleStyle}>{name.subAtt[i].name}</h4>
                <img style={this.loadPic} className="card-img-top" src={name.subAtt[i].image}/>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" style={this.listcolor}>
                        <p className="font-weight-bold" style={this.listText}>Current Load:</p>
                        <div style={this.loadBar}>
                            <CircularProgressbar value={name.subAtt[i].load.currCount}
                                                 maxValue={name.subAtt[i].load.maxCount}
                                                 text={`${innercurrLoadCap * 100}%`}
                                                 styles={{
                                                     path: {
                                                         transformOrigin: "center center",
                                                         strokeLinecap: "butt",
                                                         stroke: innercurrLoadCap >= 0.7 ? "#bd2327" : "#2293dd"
                                                     },
                                                     trail: {
                                                         strokeWidth: 7
                                                     },
                                                     text: {
                                                         fontSize: 22,
                                                         fontWeight: 500,

                                                         animation: "fadein 2s",
                                                         fill: innercurrLoadCap >= 0.7 ? "#bd2327" : "#2293dd"
                                                     }
                                                 }}

                            />
                        </div>
                    </li>
                    <li className="list-group-item" style={this.listcolor}>
                        <p className="font-weight-bold" style={this.listText}>Predicted Load
                            {"\n"}At {name.subAtt[i].load.suggestion[0]}:00:</p>
                        <div style={this.loadBar}>
                            <CircularProgressbar value={innerpredictload}
                                                 maxValue={100}
                                                 text={`${innerpredictload}%`}
                                                 styles={{
                                                     path: {
                                                         transformOrigin: "center center",
                                                         strokeLinecap: "butt",
                                                         stroke: innerpredictload >= 70 ? "#bd2327" : "#2293dd"
                                                     },
                                                     trail: {
                                                         strokeWidth: 7
                                                     },
                                                     text: {
                                                         fontSize: 22,
                                                         fontWeight: 500,

                                                         animation: "fadein 2s",
                                                         fill: innerpredictload >= 70 ? "#bd2327" : "#2293dd"
                                                     }
                                                 }}

                            />
                        </div>
                    </li>
                    <li className="list-group-item" style={this.listcolor}/>

                </ul>
                    </div>
                )
            }
            if(sumcurrload == 0) {
                sumloadcap = 0
                summaxload = 1
            }
            else {
                sumloadcap = Math.round((sumcurrload / summaxload)*100)
            }
            sumpreditload = Math.round(sumpreditload/name.subAtt.length)
            return <div key={`container ${i}`} className="card" style={this.listStyle}>
                <div className="card-body">
                    <Load key={`load${i}`} index={i}>
                        <h4 className="card-title" style={this.titleStyle}>{name.name}</h4>
                        <img style={this.loadPic} className="card-img-top" src={name.image}/>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" style={this.listcolor}>
                                <button style={this.buttonStyle} type="button" class="btn btn-light" onClick={() => this.setState({expend: 0})}>Minimize</button>
                            </li>
                            <li className="list-group-item" style={this.listcolor}>
                                <p className="font-weight-bold" style={this.listText}>Current Load:</p>
                                <div style={this.loadBar}>
                                    <CircularProgressbar value={sumcurrload}
                                                         maxValue={summaxload}
                                                         text={`${sumloadcap}%`}
                                                         styles={{
                                                             path: {
                                                                 transformOrigin: "center center",
                                                                 strokeLinecap: "butt",
                                                                 stroke: sumloadcap >= 70 ? "#bd2327" : "#2293dd"
                                                             },
                                                             trail: {
                                                                 strokeWidth: 7
                                                             },
                                                             text: {
                                                                 fontSize: 22,
                                                                 fontWeight: 500,

                                                                 animation: "fadein 2s",
                                                                 fill: sumloadcap  >= 70 ? "#bd2327" : "#2293dd"
                                                             }
                                                         }}

                                    />
                                </div>
                            </li>
                            <li className="list-group-item" style={this.listcolor}>
                                <p className="font-weight-bold" style={this.listText}>Predicted Load
                                    {"\n"}At {moment().format('LT')}:</p>
                                <div style={this.loadBar}>
                                    <CircularProgressbar value={sumpreditload}
                                                         maxValue={100}
                                                         text={`${sumpreditload}%`}
                                                         styles={{
                                                             path: {
                                                                 transformOrigin: "center center",
                                                                 strokeLinecap: "butt",
                                                                 stroke: sumpreditload >= 70 ? "#bd2327" : "#2293dd"
                                                             },
                                                             trail: {
                                                                 strokeWidth: 7
                                                             },
                                                             text: {
                                                                 fontSize: 22,
                                                                 fontWeight: 500,

                                                                 animation: "fadein 2s",
                                                                 fill: sumpreditload >= 70 ? "#bd2327" : "#2293dd"
                                                             }
                                                         }}

                                    />
                                </div>
                            </li>
                            <li className="list-group-item" style={this.listcolor}>
                                <h4 className="card-title" style={{
                                    fontSize: "calc(19px + 1vw)",
                                    textAlign:"center",
                                    padding:0,
                                    margin:0,
                                    color:"#8c8a88",
                                    //transform: "translateY(-60%)",
                                }}>Inner Attractions</h4>
                            </li>
                            <li  className="list-group list-group-flush "style={{marginTop:"8%"}}>{buffer}</li>
                </ul>
                    </Load>
                </div>
            </div>
        }
        else {
            innercurrLoadCap = 0;
            sumcurrload = 0;
            summaxload = 0;
            sumloadcap = 0;
            sumpreditload = 0;
            for(let i = 0 ; i< subAttCount ; i++) {
                if((name.subAtt[i].load.currCount === 0 && name.subAtt[i].load.maxCount === 0) ||
                    (name.subAtt[i].load.currCount === 1 && name.subAtt[i].load.maxCount === 0 ))
                    innercurrLoadCap = 0;
                else
                    innercurrLoadCap = (name.subAtt[i].load.currCount/name.subAtt[i].load.maxCount).toFixed(2)


                let innerpredictload = parseInt(name.subAtt[i].load.suggestion[1],10)
                sumpreditload += innerpredictload

                sumcurrload += name.subAtt[i].load.currCount
                summaxload += name.subAtt[i].load.maxCount
            }
            if(sumcurrload == 0) {
                sumloadcap = 0
                summaxload = 1
            }
            else {
                sumloadcap = Math.round((sumcurrload / summaxload)*100)
            }
            sumpreditload = Math.round(sumpreditload/name.subAtt.length)
            return (
                <div key={`container ${i}`} className="card" style={this.listStyle}>
                    <div class="card-body">
                        <Load key={`load${i}`} index={i}>
                            <h4 class="card-title" style={this.titleStyle}>{name.name}</h4>
                            <img style={this.loadPic} class="card-img-top" src={name.image}/>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" style={this.listcolor}>
                                    <button style={this.buttonStyle} type="button" class="btn btn-light" onClick={() => this.setState({expend: name._id})}>Expand</button>
                                </li>
                                <li className="list-group-item" style={this.listcolor}>
                                    <p className="font-weight-bold" style={this.listText}>Current Load:</p>
                                    <div style={this.loadBar}>
                                        <CircularProgressbar value={sumcurrload}
                                                             maxValue={summaxload}
                                                             text={`${sumloadcap}%`}
                                                             styles={{
                                                                 path: {
                                                                     transformOrigin: "center center",
                                                                     strokeLinecap: "butt",
                                                                     stroke: sumloadcap >= 70 ? "#bd2327" : "#2293dd"
                                                                 },
                                                                 trail: {
                                                                     strokeWidth: 7
                                                                 },
                                                                 text: {
                                                                     fontSize: 22,
                                                                     fontWeight: 500,

                                                                     animation: "fadein 2s",
                                                                     fill: sumloadcap >= 70 ? "#bd2327" : "#2293dd"
                                                                 }
                                                             }}

                                        />
                                    </div>
                                </li>
                                <li className="list-group-item" style={this.listcolor}>
                                    <p className="font-weight-bold" style={this.listText}>Predicted Load
                                        {"\n"}At {moment().format('LT')}:</p>
                                    <div style={this.loadBar}>
                                        <CircularProgressbar value={sumpreditload}
                                                             maxValue={100}
                                                             text={`${sumpreditload}%`}
                                                             styles={{
                                                                 path: {
                                                                     transformOrigin: "center center",
                                                                     strokeLinecap: "butt",
                                                                     stroke: sumpreditload >= 70 ? "#bd2327" : "#2293dd"
                                                                 },
                                                                 trail: {
                                                                     strokeWidth: 7
                                                                 },
                                                                 text: {
                                                                     fontSize: 22,
                                                                     fontWeight: 500,

                                                                     animation: "fadein 2s",
                                                                     fill: sumpreditload >= 70 ? "#bd2327" : "#2293dd"
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
    }
    handleChange() {
        this.setState({
            searchString: this.refs.search.value
        })
    }
    greet() {
        const currentHour = new Date().getHours();

        const greetingMessage =
            currentHour >= 4 && currentHour < 12 ? // after 4:00AM and before 12:00PM
                'Good morning.' :
                currentHour >= 12 && currentHour <= 17 ? // after 12:00PM and before 6:00pm
                    'Good afternoon.' :
                    currentHour > 17 || currentHour < 4 ? // after 5:59pm or before 4:00AM (to accommodate night owls)
                        'Good evening.' : // if for some reason the calculation didn't work
                        'Welcome'
        return greetingMessage
    }

    render(){
        console.log("call")
        if(this.state.GPS === 0)
        {
            return(
                <div>Please Enable Your Gps Position</div>
            )
        }
        else {
            let _loads = this.state.loads;
            console.log(_loads)
            let search = this.state.searchString.replace(/[\\/:*?"<>|]/g, c=>"__i!__"+c.charCodeAt(0)+"__!i__").trim().toLowerCase()
            if (search.length > 0) {
                _loads = _loads.filter(function(loads) {
                    return loads.category.toLowerCase().match(search);
                });
            }
            return (
                <div className='Tourist'>
                    <img style={this.headerPicture} src={require('../images/monitourLogoSmall.png')} />
                    <p style={this.greetext}>{this.greet()}</p>
                    <input
                        style={this.searchStyle}
                        type="text"
                        value={this.state.searchString}
                        ref="search"
                        onChange={this.handleChange}
                        placeholder="Search"
                    />

                    {_loads.map(this.eachLoad)}



                </div>

            )
        }
    }
}

export default Tourist;