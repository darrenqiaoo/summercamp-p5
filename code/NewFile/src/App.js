import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import FileField from './FileField';
import Showfiles from './showfiles';
import Showcontent from './showcontent';

//App是路由配置文件；
class App extends React.Component {
  render(){
    return(
      <Router >
        <div>
          {/*exact代表不渲染跳转之前的主页内容,否则页面内容会叠加*/}
          {/*path代表跳转页面后，需要加上的的url*/}
          <Route exact path="/" component={FileField} />
          <Route path="/Showfiles" component={Showfiles} />
          <Route path="/Showcontent" component={Showcontent} />
        </div>
      </Router>
    )
  }
}
export default App;
