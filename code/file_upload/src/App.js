import React from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import MyTemplate from "./jsPages/template/template";
//import Test from "./tests/test";

function App() {
    return (
        <Router>
            <div>
                <Route exact path={"/"} component={MyTemplate}/>
                {/*<Route path={'/test'} component={Test}/>*/}
            </div>
        </Router>
    );
}

export default App;
