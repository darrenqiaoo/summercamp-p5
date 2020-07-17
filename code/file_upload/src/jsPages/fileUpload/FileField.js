import React from "react";
import './FileField.css'
import FileShowBox from '../../commonComponents/fileShowBox'
import FileList from "../../commonComponents/fileList";

class PageFileUpload extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            style: {backgroundColor: "#FFFFCC"},
            tips: this.props.files.length>0?this.props.files.length+" files have been added.":"There's no file.",
            showText: "",
        };
        this.submitBtnClick = this.submitBtnClick.bind(this);
        this.clear = this.clear.bind(this);
        this.setShowText = this.setShowText.bind(this);
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
    //文件数量增加
    onFileNumChange(){
        let objFile = document.getElementById("file_input").files[0];
        let temp = this.props.files;
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
        });
        this.props.setFiles(temp);
        //console.log(temp[temp.length-1].name);
    }
    //提交进入下一流程
    submitBtnClick(){
        if(this.props.files.length===0){
            alert("Please choose at least 1 file.")
        }
        else{
            this.props.setPage(1);
        }
    }
    //清空文件列表
    clear(){
        this.setState({
            tips: "no file has been added",
            showText: "",
        });
        this.props.setFiles([]);
    }
    //供子组件调用修改showText
    setShowText(text){
        this.setState({
            showText: text,
        });
    }
    render() {
        return (
            <div className={"fUpload_area"}>
                <div className="fileField">
                    <p className="tips1">Drop files to the following box</p>
                    <div className={"dropBox"} style={this.state.style}>
                        <span className={"tips3"}> {this.state.tips} </span>
                        <input type={"file"} className={"file_input"} id={"file_input"}
                               onDragEnter={() => this.dragEnter()}
                               onDragLeave={() => this.dragLeave()}
                               onDrop={() => this.dropFile()}
                               onChange={() => this.onFileNumChange()}/>
                    </div>
                    <div className={"file_list_container"}>
                        <FileShowBox className={"showFile"} id={"showBox"} value={this.state.showText}/>
                        <FileList className={"file_ul"} files={this.props.files} setShowText={this.setShowText}/>
                    </div>
                    <button className={"submit"} onClick={this.submitBtnClick}> submit </button>
                    <button className={"clear"} onClick={this.clear}> clear </button>
                </div>
            </div>
        );
    }
}

export default PageFileUpload;