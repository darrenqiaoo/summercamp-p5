import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function FileList(props){
    const files = props.files;
    const listItems = files.map((file)=>
        <li key={file.name.toString()}>{file.name}</li>);
    return (
        <ul className={"file_ul"}>
            {listItems}
        </ul>
    );
 }
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
        let objFile = document.getElementById("file_input");
        let temp = this.state.files.slice();
        temp.push(objFile.files[0]);
        this.setState({
            tips: temp.length + " file has been added",
            files: temp,
        });
        console.log(temp[temp.length-1].name);
    }
    clear(){
        this.setState({
            tips: "no file has been added",
            files: [],
        });
    }
    render() {
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
                    <FileList files={this.state.files}/>
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

