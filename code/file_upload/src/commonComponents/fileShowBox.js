import React from "react";

class FileShowBox extends React.Component{
    constructor(props) {
        super(props);
        this.onBoxChange = this.onBoxChange.bind(this);
    }
    onBoxChange(){}
    render() {
        return(
            <div className={this.props.className}>
                <textarea id={this.props.id} value={this.props.value} onChange={this.onBoxChange}/>
            </div>
        );
    }
}

export default FileShowBox;