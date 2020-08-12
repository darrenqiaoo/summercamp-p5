import React from "react";
import Example1 from "./example1";

class Example2 extends Example1{
    constructor(props) {
        super(props);
        this.state = {
            receive: "",
        }
    }
    componentDidMount() {
        let search = this.props.history.location.search;
        console.log(search);
    }

    render() {
        return (
            <div style={{"width":100, "height":100, "border": "1px solid red"}}>

            </div>
        );
    }
}

export default Example2;