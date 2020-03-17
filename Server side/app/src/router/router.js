import React from 'react';
import {Route} from 'react-router-dom'
import LoadList from '../Components/LoadList';
import test from '../Components/test';
import Header from '../Header'

const ReactRouter = () => {
    return (
        <React.Fragment>
            <Header />
            <Route exact path="/" component={LoadList}/>
            <Route exact path="/test" component={test}/>
        </React.Fragment>
    )
}
export default ReactRouter