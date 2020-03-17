import React, {Component} from 'react';
import Load from './Load'
import {MdAdd} from 'react-icons/md'
class LoadList extends Component {
    listStyle  = {
        position:"relative",
        marginTop:30,width: 28 + 'rem',
        marginBottom: 7 + 'px',
        left: "50%",
        transform: "translateX(-50%)"
    }
    constructor(props) {
        super(props);
        this.state = {
            loads: []
        }
        this.eachLoad = this.eachLoad.bind(this)
        this.nextID = this.nextID.bind(this)
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


    const url = 'http://localhost:3000/load_data';
    fetch(url)
        .then(res => res.json())
        .then(data => data.map(item =>
            this.add({id: item.id, txt: item.name, ld: item.load, img: item.image})))
        .catch(err => console.error(err));

}

    eachLoad(name, i) {

        return (
            <div
                key={`container ${i}`}
                className="card"
                style={this.listStyle}>
                <div class="card-body">
                    <Load key={`load${i}`} index={i}>
                        <h4 class="card-title">{name.name}</h4>
                        <img class="card-img-top" src={name.image}/>
                        <div style={{marginTop:10, marginBottom:10}}>
                        <p  className="card-text">Curr count: {JSON.stringify(name.load.currCount)}</p>
                        <p className="card-text">Max count: {JSON.stringify(name.load.maxCount)}</p>
                        <p className="card-text">Mean count: {JSON.stringify(name.load.meanCount)}</p>
                        <p className="card-text">Busy: {JSON.stringify(name.load.busy)}</p>
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