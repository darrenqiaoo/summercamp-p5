import React from "react";
import FileDropBox from "../../commonComponents/uploadDropBox";


class UploadPage extends React.Component{
    render() {
        return (
            <FileDropBox userName={this.props.userName} files={this.props.files} setFiles={this.props.setFiles}/>
        );
    }
}

export default UploadPage;