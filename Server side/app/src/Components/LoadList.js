import React, {Component} from 'react';
import Load from './Load'
import {MdAdd} from 'react-icons/md'
class LoadList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loads: []
        }
        this.eachLoad = this.eachLoad.bind(this)
        this.nextID = this.nextID.bind(this)
    }
    add({event = null, id = null, txt = 'default title', ld = 'default load'}){
        console.log(event,id,txt,ld)
        this.setState(prevState => ({
            loads: [
                ...prevState.loads,
                {id: id !== null ? id : this.nextID(prevState.loads),
                    name:txt,
                    load:ld
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
            this.add({id: item.id, txt: item.name, ld: item.load})))
        .catch(err => console.error(err));

}

    eachLoad(name, i) {

        return (
            <div
                key={`container ${i}`}
                className="card"
                style={{width: 18 + 'rem', marginBottom: 7 + 'px'}}>
                <div class="card-body">
                    <Load key={`load${i}`} index={i}>
                        <h5 class="card-title">{name.name}</h5>

                        <p className="card-text">Curr count: {JSON.stringify(name.load.currCount)}</p>
                        <p className="card-text">Max count: {JSON.stringify(name.load.maxCount)}</p>
                        <p className="card-text">Mean count: {JSON.stringify(name.load.meanCount)}</p>
                        <p className="card-text">Busy: {JSON.stringify(name.load.busy)}</p>
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