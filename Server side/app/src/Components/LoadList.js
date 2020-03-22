import React, {Component} from 'react';
import Load from './Load'
import {MdAdd} from 'react-icons/md'
import {  CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class LoadList extends Component {
    listStyle  = {
        position:"relative",
        marginTop:30,width: 28 + 'rem',
        marginBottom: 7 + 'px',
        left: "50%",
        transform: "translateX(-50%)"
    };
    loadBar = {
        marginTop:10,
        marginBottom:10,
        width:"30%"
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
            const url = 'http://localhost:3000/load_data';
            fetch(url)
                .then(res => res.json())
                .then(data => data.map(item =>
                    this.add({id: item.id, txt: item.name, ld: item.load, img: item.image})))
                .catch(err => console.error(err));

                setInterval(async () => {
                    const url = 'http://localhost:3000/load_data';
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
                }, 10000);
        } catch(e) {
            console.log(e);
        }

}

    eachLoad(name, i) {
        console.log(this.state.loads)
        return (
            <div
                key={`container ${i}`}
                className="card"
                style={this.listStyle}>
                <div class="card-body">
                    <Load key={`load${i}`} index={i}>
                        <h4 class="card-title">{name.name}</h4>
                        <img class="card-img-top" src={name.image}/>
                        <div style={this.loadBar}>
                            <CircularProgressbar style={this.pogHeight}
                                                 value={JSON.stringify(name.load.currCount)}
                                                 maxValue={10}
                                                 text={`${JSON.stringify(name.load.currCount)*10}%`}
                                                 styles={{
                                                     path: {
                                                         transform: "rotate(180deg)",
                                                         transformOrigin: "center center",
                                                         strokeLinecap: "butt",
                                                         stroke: (JSON.stringify(name.load.currCount)*10) >= 70 ? "#bd2327" : "blue"
                                                     },
                                                     trail: {
                                                         strokeWidth: 0
                                                     },
                                                     text: {
                                                         fontSize: 22,
                                                         fontWeight: 800,
                                                         animation: "fadein 2s",
                                                         fill: (JSON.stringify(name.load.currCount)*10) >= 70 ? "#bd2327" : "blue"
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