import React from "react";
import {Link} from "react-router-dom"

class Example1 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            receive: "",
        }
    }


    render() {
        return (
            <div style={{"width":100, "height":100, "border": "1px solid red"}}>
                <Link to={{pathname:"/test2", search: "aassddccc"}} target={"_blank"}>
                    <button> btn </button>
                </Link>
            </div>
        );
    }
}

export default Example1;