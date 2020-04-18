import React, {Component} from 'react'

class Histogram extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        let csvToJson = require('convert-csv-to-json');

        let fileInputName = './idkreact.csv';
        let fileOutputName = 'myOutputFile.json';

        csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
    }

    render() {
    return (
        <div>Hello</div>
    )
    }

}
export default Histogram
