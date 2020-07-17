import React from "react";

class FileShowBox extends React.Component{
    render() {
        return(
            <div className={this.props.className}>
                <textarea id={this.props.id} value={this.props.value} readOnly={true}/>
            </div>
        );
    }
}

export default FileShowBox;