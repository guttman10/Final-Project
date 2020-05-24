import React from 'react';
import {Route} from 'react-router-dom'
import Tourist from '../Components/Tourist';
import Manager from "../Components/Manager";
import test from '../Components/test';
import Header from '../Header'

const ReactRouter = () => {
    return (
        <React.Fragment>
            <title>{"MoniTour"}</title>
            <Route exact path="/" component={Tourist}/>
                <Route exact path="/manager" component={Manager}/>
        </React.Fragment>
    )
}
export default ReactRouter