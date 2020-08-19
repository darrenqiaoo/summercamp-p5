import React from "react";
import FileList from "../../commonComponents/fileList";
import "./extractPage.css"
import {Button, Form} from "antd"
import { message } from "antd";
import AppList from "../../commonComponents/appList";
import axios from "axios"

class ExtractPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fileContent: null, //文件预览内容
            visible: false,
            file: null,
        };

        this.showFileContent = this.showFileContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.formRef = React.createRef();
    }

    showFileContent(fileName){
        // 预览文件
        const fileType = fileName.split(".")[1];
        if(fileType==="txt"){
            axios.get("http://101.200.153.106:3389/files/"+fileName)
                .then(response => {
                    this.setState({
                        file: fileName,
                        fileContent: <textarea className={"preview-text"} value={response.data||""} readOnly={true}/>,
                    });
                })
                .catch(function (error) {
                console.log(error);
            });
        }
        else {
            this.setState({
                file: fileName,
                fileContent: <img className={"preview-img"} src={"http://101.200.153.106:3389/files/"+fileName} alt={""}/>,
            });
        }
    }
    setVisibility(){
        this.setState({
            visible: !this.state.visible,
        });
    }

    handleSubmit() {
        if(!this.state.fileContent){
            message.warning("No file selected!");
        }
        else {
            this.setVisibility();
        }
    }

    openApp(app){
        let target;
        switch(app){
            case 1: target=1;break;
            case 2: target=2;break;
            case 3: target=3;break;
            case 4: target=4;break;
            case 5: target=5;break;
            default:
        }
        console.log(target);
        this.setState({
            visible: !this.state.visible,
        });
    }

    handleReset(){
        this.setState({
            fileContent: "",
            formItems: null,
        });
        this.formRef.current.resetFields();
    }
    render() {
        return (
            <div className={"extractPageComponent"}>
                <div className={"extractLeft"}>
                    <div className={"listTitle"}>
                        <span>File List</span>
                    </div>
                    <FileList userName={this.props.userName}
                              files={this.props.files}
                              setFiles={this.props.setFiles}
                              showFileContent={this.showFileContent}/>
                </div>
                <div className={"extractRight"}>
                    <div className={"extractTop"}>
                        {this.state.fileContent}
                    </div>
                    <div className={"extractBottom"}>
                        <div className={"infoFormBox"}>
                            <Form ref={this.formRef} labelCol={{span:6}}>
                                {this.state.formItems}
                                <Form.Item wrapperCol={{offset: 12,span: 16,}}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>Submit</Button>
                                    <Button htmlType="button" onClick={this.handleReset}>Reset</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
                <AppList userName={this.props.userName}
                         visible={this.state.visible}
                         setVisibility={() => this.setVisibility()}
                         setSelectedApp={(app) => this.openApp(app)}
                         file={this.state.file}/>
            </div>
        );
    }
}

export default  ExtractPage;