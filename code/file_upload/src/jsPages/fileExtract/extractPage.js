import React from "react";
import FileList from "../../commonComponents/fileList";
import "./extractPage.css"
import {Button, Form, Input} from "antd"
import { message } from "antd";
import axios from "axios";

class ExtractPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fileContent: null, //文件预览内容
            formItems: null, // 表单内容
        };

        this.showFileContent = this.showFileContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.formRef = React.createRef();
    }

    generateForm(dic){
        // 生成表单
        let keys = []; // 将表单字典的键保存到列表
        for(let k in dic){
            keys.push(k);
        }
        const form = keys.map(k => {
            // 将列表映射到表单
            return (
                <Form.Item key={k} name={k} label={k} rules={[{required: true}]}>
                    <Input />
                </Form.Item>);
        });
        this.setState({
            // 将表单更新到页面
            formItems: form,
        });
    }

    showFileContent(fileName){
        // 预览文件
        const fileType = fileName.split("/")[0]; //文件类型
        this.setState({
            // 预览前重置上次生成的表单
            formItems: null,
        });
        switch (fileType) {
            // 根据文件类型调用不同处理方式，文本文件直接在前端处理，图片送到后端调用百度文字识别接口识别并返回
            case "text":
                this.formRef.current.resetFields();
                this.setState({
                    fileContent: <textarea className={"preview-text"} value={localStorage.getItem(fileName)||""} readOnly={true} />,
                });
                let dic = {};
                const s = localStorage.getItem(fileName).split("\n");
                for(let i=0;i<s.length;i++){
                    const temp = s[i].split(':');
                    dic[temp[0]] = temp[1];
                }
                this.generateForm(dic);
                this.formRef.current.setFieldsValue(dic);
                message.success("autofill complete.");
                break;
            case "image":
                this.formRef.current.resetFields();
                this.setState({
                    fileContent: <img className={"preview-img"} src={localStorage.getItem(fileName)} alt={""}/>,
                });
                message.loading("getting ocr result...", 1);
                axios.get("http://101.200.153.106:3389/ocr", {params: {"img": localStorage.getItem(fileName)}})
                    .then(response => {
                    let data = response.data;
                    return data.toString().split("\n");
                }).then(res => {
                    let dic = {};
                    for(let i=0;i<res.length;i++){
                        const temp = res[i].split(':');
                        dic[temp[0]] = temp[1];
                    }
                    this.generateForm(dic);
                    this.formRef.current.setFieldsValue(dic);
                    message.success("autofill complete.");
                }).catch(function (error) {
                    message.error(error);
                });
                break;
            default:
        }
    }
    handleSubmit() {
        const w = window.open("/test", "_blank");
        w.onload = () => w.postMessage("hello", w.origin);
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
                    <FileList files={this.props.files}
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
            </div>
        );
    }
}

export default  ExtractPage;