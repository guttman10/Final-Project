import React from 'react'
import {Route} from 'react-router-dom'
import LoadList from "../Components/LoadList";
import Header from '../Header'

const ReactRouter = () => {
    return(
        <React.Fragment>
            <Header/>
            <Route excat path="/" component={LoadList}/>
        </React.Fragment>
    )
}
export default ReactRouter