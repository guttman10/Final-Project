import React, { Component } from "react";
import RTChart from 'react-rt-chart';
import './c3.css';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
class test extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setInterval(() => this.forceUpdate(), 1000);
    }


    render() {
        var data = {
            date: new Date(),
            Visitors:getRandomInt(1,10),
        };

        return <RTChart
            fields={['Visitors']}
            data={data}
            maxValues={10}/>
    }
}

export default test;
