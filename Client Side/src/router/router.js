import React from 'react';
import {Route} from 'react-router-dom'
import Visitor from '../Components/Visitor';
import Manager from "../Components/Manager";

const ReactRouter = () => {
    return (
        <React.Fragment>
            <title>{"MoniTour"}</title>
            <Route exact path="/" component={Visitor}/>
                <Route exact path="/manager" component={Manager}/>
        </React.Fragment>
    )
}
export default ReactRouter