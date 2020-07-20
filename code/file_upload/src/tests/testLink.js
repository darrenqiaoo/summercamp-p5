import React from "react";
import {Link} from "react-router-dom";

class TestLink extends React.Component{
    render() {
        return (
            <div>
                <Link to={"/t2"}>
                    <button>btnTest</button>
                </Link>
            </div>
        );
    }
}
export default TestLink;