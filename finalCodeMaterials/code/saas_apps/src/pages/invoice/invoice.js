import React from "react";
import "./invoice.css"
import "antd/dist/antd.css";
import axios from "axios"
import {Form, Input, message} from "antd";

export default class Invoice extends React.Component{
    constructor(props) {
        super(props);
        let file = decodeURIComponent(this.props.location.search);
        file = file.substr(1, file.length);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            file: file,
            ocrResult: "",
        };
        this.formRef = React.createRef();
        this.generateForm = this.generateForm.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
        axios.get("http://101.200.153.106:3389/ocr", {
            params:{fileName: this.state.file, ocrType:"receipt"}
        }).then(response => {
            console.log(response.status);
            let data = "";
            for(let i=0;i<response.data["trans_result"].length;i++){
                data += response.data["trans_result"][i]["dst"] + "\n";
            }
            this.generateForm(data);
        }).catch(e => {
            console.log(e);
        })
    }
    handleResize = e => {
        this.setState({
            width: e.target.innerWidth,
            height: e.target.innerHeight,
        });
    };
    generateForm(data){
        // 生成表单
        let dic = {};
        const s = data.split("\n");
        for(let i=0;i<s.length-1;i++){
            const temp = s[i].split(':');
            dic[temp[0]] = temp[1];
        }
        let keys = []; // 将表单字典的键保存到列表
        for(let k in dic){
            keys.push(k);
        }
        const appContent = keys.map(k => {
            // 将列表映射到表单
            return (
                <Form.Item key={k} name={k} label={k} rules={[{}]}>
                    <Input/>
                </Form.Item>);
        });
        this.setState({
            formItems: appContent,
        });
        this.formRef.current.setFieldsValue(dic);
        message.success("autofill complete.");
    }
    render(){
        return (
            <div style={{height: this.state.height,
                width: this.state.width,
                backgroundColor: "rgb(255,255,255)",}}>
                <div>

                </div>
                <div style={{width: 0.6*this.state.width,
                             margin: "50px auto",
                             border: "1px solid red",
                             paddingRight: 10}}>
                    <Form ref={this.formRef} labelCol={{span:10}}>
                        {this.state.formItems}
                    </Form>
                </div>
            </div>
        );
    }

}