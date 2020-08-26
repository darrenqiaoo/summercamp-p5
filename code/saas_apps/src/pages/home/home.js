import React from "react";
import "./home.css"
import {Link} from "react-router-dom";


export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    componentDidMount() {
        window.addEventListener("resize", ()=>this.handelResize());
    }
    handelResize(){
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }
    render(){
        return (
            <div className={"home"} style={{width: this.state.width*0.99, height: this.state.height*0.99}}>
                <ul className={"apps"}>
                    <li><Link to={{pathname: "/translate"}}><span>Translate</span></Link></li>
                    <li><Link to={{pathname: "/markdown"}}><span>Markdown</span></Link></li>
                    <li><Link to={{pathname: "/invoice"}}><span>Invoice</span></Link></li>
                </ul>
            </div>
        );
    }
}