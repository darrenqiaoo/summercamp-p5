import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MyTemplate from "./jsPages/template/template";

function App() {
    return (
        <Router>
            <div>
                <Route exact path={"/"} component={MyTemplate}/>
            </div>
        </Router>
    );
}

export default App;
