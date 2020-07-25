import React from 'react';
import {Link} from "react-router-dom"
//import './index.css';


//这是主页home，也就是文件拖拽页面;
class FileField extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            style: {backgroundColor: "#FFFFCC"},
            tips: "no file has been added",
            files: [],
        };
        //为了在回调函数中使用this，必须进行绑定；
        this.clear = this.clear.bind(this);
        this.once_submit = this.once_submit.bind(this);
        //this.show_all = this.show_all.bind(this);
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
        //清除showBox内容；
        const showBox = document.getElementById("showBox");
        showBox.innerHTML = "";
        //清理所有的localstorage；
        localStorage.clear();   
    }

    liClick(file_name){
        const temp = file_name.split('.');
        //分隔开文件名和后缀名，进而判断是否符合要求；
        const support = ["docx","jpg","txt", "html", "md", "css", "js"];
        if(support.indexOf(temp[temp.length-1])===-1){
            const showBox = document.getElementById("showBox");
            showBox.innerHTML = "Can only preview .docx, .jpg, .txt, .html, .md, .css, .js files";
            return ;
        }
        const files = this.state.files;
        //console.log(files);
        //把文件名name提取出来,放进file_names列表，剩余的内容不要；
        const file_names = files.map(f => f.name); 
        //console.log(file_names);
        const index = file_names.indexOf(file_name);
        //初始化一个FileReader对象
        let reader = new FileReader();
        reader.onload = function() {
            //保存到localstorage里面；
            //localStorage.setItem(file_name, reader.result);  
            if(reader.result) {
                //读取结果放进showBox里进行显示；
                //reader.result就是读取出来的内容结果；
                const showBox = document.getElementById("showBox");  
                showBox.innerHTML = reader.result;
            }
        };
        //gb2312方式读取文件内容，防止乱码；
        reader.readAsText(files[index],'gb2312');
        //reader.readAsText(files[index],'utf-8');
    };

    //点击submit所有的数据能全部保存到localstorage里面；
    once_submit=()=>{
        const files = this.state.files;
        //map方式获取文件名，剩余内容不需要；
        const file_names = files.map(f => f.name);
        //console.log(file_names); 
        //console.log(file_names.length);
        for(let i=0;i<file_names.length;i++)
        {
            //初始化一个FileReader对象
            let reader = new FileReader();
            reader.onload = function() {
                //将上传的文件保存进localstorage中，可使用localstorage的setItem方法；
                localStorage.setItem(file_names[i], reader.result);  
            };
            //gb2312方式读取文件内容，防止乱码；
            reader.readAsText(files[i],'gb2312');
        }
    }

    render() {
        //显示所有拖拽的文件名；
        const files = this.state.files;
        //console.log(files);
        const fileList = files.map(file => {
            //产生点击效果，点击文件名可以在showbox中显示文件内容；
            return(<li key={file.name.toString()} onClick={() => this.liClick(file.name)}>{file.name}</li>);  
        });
        return (
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
                    <div className={"showFile"}>
                        <textarea id={"showBox"}/>     {/*textarea多行文本框；*/}
                    </div>
                    <ul className={"file_ul"}>
                        {fileList}
                    </ul>
                </div>
                <button className="submit" onClick={this.once_submit}> submit </button>
                <button className="clear" onClick={this.clear}> clear </button>
                <Link to="/Showfiles" style={{color:'black'}}> 
                    <div> show all files </div>
                </Link>
                {/*<button className="show_all" onClick={this.show_all}> show all files</button>*/}
            </div>
        );
    }
}

/*
ReactDOM.render(
    <div className={"fUpload_area"}>
        <FileField />
    </div>,
  document.getElementById('root')
);
*/

export default FileField;