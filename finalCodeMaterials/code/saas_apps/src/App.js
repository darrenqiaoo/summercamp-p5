import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Translate from "./pages/translate/translate";
import Home from "./pages/home/home";
import Markdown from "./pages/markdown/markdown";
import Invoice from "./pages/invoice/invoice";


function App() {
  return (
      <Router>
          <Route exact path={"/"} component={Home}/>
          <Route path={"/translate"} component={Translate}/>
          <Route path={"/markdown"} component={Markdown}/>
          <Route path={"/invoice"} component={Invoice}/>
      </Router>
  );
}

export default App;
