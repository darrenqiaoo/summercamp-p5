import React from "react";
import './FileField.css'
import FileShowBox from '../../commonComponents/fileShowBox'
import FileList from "../../commonComponents/fileList";
import {Link} from "react-router-dom";

class PageFileUpload extends React.Component{
    constructor(props) {
        super(props);
        let storage = [];
        for(let i=0;i<localStorage.length;i++){
            storage.push(localStorage.key(i));
        }
        this.state = {
            new_files: [],
            file_names:storage,
            style: {backgroundColor: "#FFFFCC"},
            tips: localStorage.length>0?localStorage.length+" files have been added.":"There's no file.",
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
        let objFile = document.getElementById("area_extract_for_file_input").files[0];
        let temp1 = this.state.new_files.slice();
        let temp2 = this.state.file_names.slice();
        if(!objFile){
            return ;
        }
        if(this.state.file_names.indexOf(objFile.name)>-1){
            alert("File already exists");
            return ;
        }
        temp1.push(objFile);
        temp2.push(objFile.name);
        this.setState({
            tips: temp2.length + " file has been added",
            new_files: temp1,
            file_names: temp2,
        });
    }
    //提交进入下一流程
    submitBtnClick(){
        if(this.state.new_files.length===0){
            alert("Please choose at least 1 file!");
        }
        else{
            const new_file_names = this.state.new_files.map(f => f.name);
            for(let i=0;i<new_file_names.length;i++)
            {
                let reader = new FileReader();
                reader.onload = e=> {
                    localStorage.setItem(new_file_names[i], e.target.result);
                };
                reader.readAsText(this.state.new_files[i],'gb2312');
            }
            alert("Submit successfully!")
        }
    }
    //清空文件列表
    clear(){
        this.setState({
            tips: "no file has been added",
            new_files: [],
            file_names: [],
            showText: "",
        });
        localStorage.clear();
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
                        <FileList className={"file_ul"} files={this.state.file_names} setShowText={this.setShowText}/>
                    </div>

                    <button className={"submit"} onClick={this.submitBtnClick}> submit </button>
                    <button className={"clear"} onClick={this.clear}> clear </button>
                    <Link to={"/extract"}>
                        <button className={"next"}> next </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default PageFileUpload;
