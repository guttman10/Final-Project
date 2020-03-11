import React, {Component} from 'react';
import Load from './Load'
import data from'../data/data.json'
import {MdAdd} from 'react-icons/md'
class LoadList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loads: [

               // {name: 'FunTown',
               //     load: {
               //         maxCount:10,
                //        currCount:5,
                //        meanCount:3,
                //        busy:0.8,
                //    }
               //      },
               // {name: 'EasyTown',
                 //   load: {
                 //       maxCount:10,
                 //       currCount:5,
                 //       meanCount:3,
                 //       busy:0.8,
               //     }
           //     }
            ]
        }
        this.eachLoad = this.eachLoad.bind(this)
        this.nextID = this.nextID.bind(this)
    }
    add(txt,ld){
        this.setState(prevState => ({
            loads: [
                ...prevState.loads,
                {id: this.nextID(),
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
componentWillMount() {
        var self=this
    data.map(function(name) {
        console.log('load')
        self.add(name.name,name.load)
    })
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