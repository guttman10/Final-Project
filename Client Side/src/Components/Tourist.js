import React, {Component} from 'react';
import Load from './Load'
import {MdAdd} from 'react-icons/md'
import {  CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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

    constructor(props) {
        super(props);
        this.state = {
            loads: [],
            Latitude:0,
            Longitude:0,
            GPS:0,
            searchString: "",
        }
        this.baseState = this.state
        this.eachLoad = this.eachLoad.bind(this)
        this.nextID = this.nextID.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
    reset = () => {
        this.setState(this.baseState)
    }

    add({event = null, id = null, txt = 'default title', ld = 'default load', img = null, loc = null, cate = null}){
        console.log(event,id,txt,ld,img,loc,cate)
        this.setState(prevState => ({
            loads: [
                ...prevState.loads,
                {id: id !== null ? id : this.nextID(prevState.loads),
                    name:txt,
                    load:ld,
                    image:img,
                    location:loc,
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

                //const url = 'https://moninode.herokuapp.com/load_data'; for real use
                const url = 'http://localhost:3000/load_data';
                fetch(url)
                    .then(res => res.json())
                    .then(data => data.map(item => {
                            if ((Math.abs(item.location.latitude - this.state.Latitude) <= 0.01) &&
                                (Math.abs(this.state.Latitude - item.location.latitude) <= 0.01)) {
                                counter = counter+1;
                                this.add(
                                    {id: item.id, txt: item.name, ld: item.load, img: item.image,cate: item.category})}}))
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
                                    let loadindex = loadtemp.findIndex(x => x.id == item.id);
                                    loadtemp[loadindex].load = item.load
                                    innercount++
                                    if (this._isMounted) {
                                        if (innercount === counter) {
                                            this.setState({
                                                loads: loadtemp
                                            })}};}}})).catch(err => console.error(err));}, 5000);})}}
    componentWillUnmount() {
        this._isMounted = false;
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
                        <h4 class="card-title" style={this.titleStyle}>{name.name}</h4>
                        <img style={this.loadPic} class="card-img-top" src={name.image}/>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" style={this.listcolor}></li>
                            <li className="list-group-item"  style={this.listcolor}>
                                <p className="font-weight-bold"  style={this.listText}>Current Load:</p>
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
                            <li className="list-group-item" style={this.listcolor}>
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
                            <li className="list-group-item" style={this.listcolor} />

                        </ul>
                    </Load>
                </div>
            </div>


        )
    }
    handleChange() {
        this.setState({
            searchString: this.refs.search.value
        })
    }
    greet()
    {
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
            let search = this.state.searchString.trim().toLowerCase();

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