import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MyTemplate from "./jsPages/template/template";
import Example1 from "./jsPages/examples/example1";
import Example2 from "./jsPages/examples/example2";
import AppExample from "./jsPages/apps/appExample";

function App() {
    return (
        <Router>
            <div>
                <Route exact path={"/"} component={MyTemplate}/>
                <Route path={"/test1"} component={Example1}/>
                <Route path={"/test2"} component={Example2}/>
                <Route path={"/appExample"} component={AppExample}/>
            </div>
        </Router>
    );
}

export default App;
