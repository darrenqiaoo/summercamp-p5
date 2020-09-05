import React from "react";
import {message} from "antd";
import {BulbOutlined, FileAddOutlined} from "@ant-design/icons";
import "./uploadDropbox.css";
import axios from "axios";
import AppList from "./appList";

class FileDropBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            file: "",
            app: ["none", "none", "none"],
        };
    }
    openApp(){
        this.setState({
            visible: false,
        });
    }
    // 文件拖拽组件
    borderColorLight(){
        // 鼠标进入或文件拖入，组件边框及背景的响应
        const fileDropBox = document.getElementById("fileDropBox");
        if(fileDropBox)
        {
            fileDropBox.style.borderColor = "#379FFF";
            fileDropBox.style.backgroundColor = "#F8F8F8";
        }
    }
    borderColorDim(){
        // 鼠标离开或文件拖拽结束或取消文件拖拽，文件上传组件边框恢复原始状态
        const fileDropBox = document.getElementById("fileDropBox");
        if(fileDropBox)
        {
            fileDropBox.style.borderColor = "#D4D4D4";
            fileDropBox.style.backgroundColor = "#FFFFFF";
        }
    }
    handleAddFile(e){
        // 文件输入框有新文件加入
        const objFile = e.currentTarget.files;
        if(!objFile){
            // 文件对象列表为空
            return ;
        }
        let files = this.props.files; // 父组件传递来的文件列表
        let appendList = []; // 记录新文件
        for (let i=0;i<objFile.length;i++){
            // 将文件输入框列表对象与已有文件逐一比对
            if(files.indexOf(objFile[i].name)>-1){
                // 文件以存在
                message.warn(objFile[i].name+" already exists.");
            }else {
                // 文件不存在，加入新文件列表
                appendList.push(objFile[i]);
            }
        }
        for (let i=0;i<appendList.length;i++){
            files.push(appendList[i].name);
            let reader = new FileReader();
            reader.onload = (e) => {
                // 读文件，上传
                axios.post("http://101.200.153.106:3389/upload",
                    {params: {"userName": this.props.userName,
                                   "type":appendList[i].type.split("/")[0],
                                   "name":appendList[i].name,
                                   "content":e.target.result.toString()}})
                    .catch(function (error) {
                        message.error(error);
                    });
            };
            switch ((appendList[i].type || "").split("/")[0]){
                // 根据文件类型用不同方法读文件
                case "text": reader.readAsText(appendList[i],"utf8");break;
                case "image": reader.readAsDataURL(appendList[i]);break;
                default :
            }
            message.success(appendList[i].name+" has been added.");
        }
        if(appendList.length===1){
            this.setState({
                visible: true,
                file: appendList[0].name,
            });
            if((appendList[0].type || "").split("/")[0]==="image"){
                this.setState({
                    app: ["none", "block", "block"],
                });
            }
            if((appendList[0].name || "").split(".")[1]==="txt"){
                this.setState({
                    app: ["block", "none", "block"],
                });
            }
            if((appendList[0].name || "").split(".")[1]==="md"){
                this.setState({
                    app: ["block", "none", "none"],
                });
            }
        }
        this.props.setFiles(files); // 更新父组件文件名列表
        e.target.value = []; // 清空文件输入框
    }
    render() {
        return  (
            <div className={"fileDropBox"} id={"fileDropBox"}
                 onMouseEnter={() => this.borderColorLight()}
                 onMouseLeave={() => this.borderColorDim()}>
                <AppList visible={this.state.visible}
                         setSelectedApp={() => this.openApp()}
                         file={this.state.file}
                         app={this.state.app}/>
                <span className="uploadDragIcon"><FileAddOutlined /></span>
                <span className="uploadTips"><BulbOutlined />Click or drag file to this area to upload</span>
                <input type={"file"} id={"fileInput"} title={""} multiple={true}
                       onDragEnter={() => this.borderColorLight()}
                       onDragLeave={() => this.borderColorDim()}
                       onDrop={() => this.borderColorDim()}
                       onChange={(e) => this.handleAddFile(e)}/>
            </div>
        );
    }
}

export default FileDropBox;
