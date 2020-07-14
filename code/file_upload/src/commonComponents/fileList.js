import React from "react";

class FileList extends React.Component{
    itemClick(file_name){
        const file_type = file_name.split('.');
        const support = ["txt", "html", "md", "css", "js"];
        if(support.indexOf(file_type[file_type.length-1])===-1){
            this.props.setShowText("Can only preview .txt, .html, .md, .css, .js files");
            return ;
        }
        const files = this.props.files;
        const file_names = files.map(f => f.name);
        const index = file_names.indexOf(file_name);
        let reader = new FileReader();
        reader.onload = function(e) {
            if(reader.result) {
                this.props.setShowText(e.target.result);
            }
        }.bind(this);
        reader.readAsText(files[index]);
    };

    render() {
        const files = this.props.files;
        const fileList = files.map(file => {
            return(<li key={file.name.toString()} onClick={() => this.itemClick(file.name)}>{file.name}</li>);
        });
        return (
            <ul className={this.props.className}>
                {fileList}
            </ul>
        );
    }
}

export default FileList;