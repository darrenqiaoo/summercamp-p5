import React from "react";

class FileList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            support_types: ["txt", "html", "md", "css", "js"],
        }
    }
    itemClick(file_name){
        const file_type = file_name.split('.');
        const support = this.state.support_types.slice();
        if(support.indexOf(file_type[file_type.length-1])===-1 || file_type.length<2){
            this.props.setShowText("Can only preview .txt, .html, .md, .css, .js files");
            return ;
        }
        this.props.setShowText(localStorage.getItem(file_name));
    };

    render() {
        const fileList = this.props.files.map(f => {
            return (
                <li key={f.toString()} onClick={() => this.itemClick(f)}>{f}</li>
            );
        });
        return (
            <ul className={this.props.className}>
                {fileList}
            </ul>
        );
    }
}

export default FileList;