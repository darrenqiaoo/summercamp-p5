import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class FileField extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            style: {backgroundColor: "#FFFFCC"},
            tips: "no file has been added",
            files: [],
        };
        this.clear = this.clear.bind(this);
    }
    //文件进入拖拽区
    dragEnter(){
        this.setState({
            style: {backgroundColor: "#FFFF66"},
        })
    }
    //文件离开拖拽区
    dragLeave(){
        this.setState({
            style: {backgroundColor: "#FFFFCC"},
        })
    }
    //完成文件拖拽
    dropFile() {
        this.setState({
            style: {backgroundColor: "#FFFFCC"},
        });
    }
    onFileNumChange(){
        let objFile = document.getElementById("file_input").files[0];
        let temp = this.state.files.slice();
        const tempNames = temp.map(f => f.name);
        //console.log(tempNames);
        if(!objFile){
            return ;
        }
        if(tempNames.indexOf(objFile.name)>-1){
            alert("File already exists");
            return ;
        }
        temp.push(objFile);
        this.setState({
            tips: temp.length + " file has been added",
            files: temp,
        });
        //console.log(temp[temp.length-1].name);
    }
    clear(){
        this.setState({
            tips: "no file has been added",
            files: [],
        });
        const showBox = document.getElementById("showBox");
        showBox.innerHTML = "";
    }
    liClick(file_name){
        const temp = file_name.split('.');
        const support = ["txt", "html", "md", "css", "js"];
        if(support.indexOf(temp[temp.length-1])===-1){
            const showBox = document.getElementById("showBox");
            showBox.innerHTML = "Can only preview .txt, .html, .md, .css, .js files";
            return ;
        }
        const files = this.state.files.slice();
        const file_names = files.map(f => f.name);
        const index = file_names.indexOf(file_name);
        let reader = new FileReader();
        reader.onload = function() {
            if(reader.result) {
                const showBox = document.getElementById("showBox");
                showBox.innerHTML = reader.result;
            }
        };
        reader.readAsText(files[index]);
    };
    render() {
        const files = this.state.files;
        const fileList = files.map(file => {
            return(<li key={file.name.toString()} onClick={() => this.liClick(file.name)}>{file.name}</li>);
        });
        return (
            <div className="fileField">
                <p className="tips1">Drop files to the following box</p>
                {/*<p className="tips2">*/}
                {/*    Hold <span className="shift_icon">shift</span> to upload to Ctrix Files directly*/}
                {/*</p>*/}
                <div className={"dropBox"} style={this.state.style}>
                    <span className={"tips3"}> {this.state.tips} </span>
                    <input type={"file"} className={"file_input"} id={"file_input"}
                           onDragEnter={() => this.dragEnter()}
                           onDragLeave={() => this.dragLeave()}
                           onDrop={() => this.dropFile()}
                           onChange={() => this.onFileNumChange()}/>
                </div>
                <div className={"file_list_container"}>
                    <div className={"showFile"}>
                        <textarea id={"showBox"}/>
                    </div>
                    <ul className={"file_ul"}>
                        {fileList}
                    </ul>

                </div>
                <button className={"submit"}> submit </button>
                <button className={"clear"} onClick={this.clear}> clear </button>
            </div>
        );
    }
}

ReactDOM.render(
    <div className={"fUpload_area"}>
        <FileField />
    </div>,
  document.getElementById('root')
);

