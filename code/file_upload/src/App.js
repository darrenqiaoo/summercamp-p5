import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PageFileUpload from "./jsPages/fileUpload/FileField";
import PageInfoExtract from "./jsPages/fileExtract/infoExtract";


function App() {
  return (
      <Router>
        <div>
          <Route exact path={"/"} component={PageFileUpload}/>
          <Route path={"/extract"} component={PageInfoExtract}/>
        </div>
      </Router>
  );
}

export default App;
