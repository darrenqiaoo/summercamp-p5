import React from "react";
import { DeleteOutlined, PaperClipOutlined } from '@ant-design/icons';
import { message } from "antd";
import "./fileList.css"

class FileList extends React.Component{
    // 文件列表组件
    itemClick(file_name){
        // 列表元素点击事件
        this.props.showFileContent(file_name);
    };
    handleDelete(file_name){
        // 删除图标点击事件
        let tempFiles = []; // 记录不删除的文件名
        for(let i=0;i<this.props.files.length;i++){
            if(this.props.files[i]!==file_name){
                // 文件名不是当前眼删除的文件名，记录到tempFiles
                tempFiles.push(this.props.files[i]);
            }
        }
        this.props.setFiles(tempFiles); // 向父组件返回删除后的文件名列表
        localStorage.removeItem(file_name); // 删除localStorage中文件名对应的记录
        message.success(file_name+" has been deleted.");
    }
    render() {
        const fList = this.props.files.map(f => {
            // 将文件名映射成列表元素
            return (
                <li key={f.toString()}>
                    <span style={{display: "inline-block", width: "80%"}} onClick={() => this.itemClick(f)}>
                        <span><PaperClipOutlined /></span>
                        <span className={"fName"}>{f}</span>
                    </span>
                    <span className={"fDelIcon"} onClick={() => this.handleDelete(f)}><DeleteOutlined /></span>
                </li>
            );
        });
        return (
            // 组件返回完成文件名映射的ul
            <ul className={"fUl"}>
                {fList}
            </ul>
        );
    }
}

export default FileList;