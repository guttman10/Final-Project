import React, {Component} from 'react';
import Load from './Load'
import {MdAdd} from 'react-icons/md'
import {  CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class LoadList extends Component {
    listStyle  = {
        position:"relative",
        marginTop:30,
        width: 34 + 'rem',
        marginBottom: 7 + 'px',
        left: "50%",
        transform: "translateX(-50%)"
    };
    loadBar = {
        position:"absolute",
        right:"10%",
        top:"35%",
        width:"20%"
    };
    loadPic = {
        height:"62%",
        width:"62%"
    }
    constructor(props) {
        super(props);
        this.state = {
            loads: []
        }
        this.baseState = this.state
        this.eachLoad = this.eachLoad.bind(this)
        this.nextID = this.nextID.bind(this)
    }
    reset = () => {
        this.setState(this.baseState)
    }
    add({event = null, id = null, txt = 'default title', ld = 'default load', img = null}){
        console.log(event,id,txt,ld,img)
        this.setState(prevState => ({
            loads: [
                ...prevState.loads,
                {id: id !== null ? id : this.nextID(prevState.loads),
                    name:txt,
                    load:ld,
                    image:img
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

        try {
            //const url = 'https://moninode.herokuapp.com/load_data'; for real use
            const url = 'http://localhost:3000/load_data';
            fetch(url)
                .then(res => res.json())
                .then(data => data.map(item =>
                    this.add({id: item.id, txt: item.name, ld: item.load, img: item.image})))
                .catch(err => console.error(err));

                setInterval(async () => {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => data.map(item =>
                        {
                            this.setState({
                                loads: this.state.loads.map(el => (el.id === item.id ? {...el, load: item.load} : el))
                            });
                        }

                           ))
                        .catch(err => console.error(err));
                }, 5000);
        } catch(e) {
            console.log(e);
        }

}

    eachLoad(name, i) {
        console.log(this.state.loads)
        let currLoadCap;
        if((JSON.stringify(name.load.currCount) == 0 && JSON.stringify(name.load.maxCount) == 0) ||
            (JSON.stringify(name.load.currCount) == 1 && JSON.stringify(name.load.maxCount) == 0)  )
            currLoadCap = 0;
        else
        {
            currLoadCap = JSON.stringify(name.load.currCount)/JSON.stringify(name.load.maxCount)
            currLoadCap = currLoadCap.toFixed(2)}
        return (
            <div key={`container ${i}`} className="card" style={this.listStyle}>
                <div class="card-body">
                    <Load key={`load${i}`} index={i}>
                        <h4 class="card-title">{name.name}</h4>
                        <img style={this.loadPic} class="card-img-top" src={name.image}/>
                        <div style={this.loadBar}>
                            <CircularProgressbar style={this.loadBar}
                                                 value={JSON.stringify(name.load.currCount)}
                                                 maxValue={JSON.stringify(name.load.maxCount)}
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
                    </Load>
                </div>
            </div>


        )
    }
    render(){
        return (
            <div className='loadList'>
               {this.state.loads.map(this.eachLoad)}
            </div>

        )
    }
}

export default LoadList