import React from "react";
import AppList from "../../commonComponents/appList";
import {Form, Input, message} from "antd";
import axios from "axios";

class AppExample extends AppList{
    constructor(props) {
        super(props);
        let search = this.props.history.location.search;
        search = JSON.parse(decodeURI(search.substr(1,search.length)));
        this.state = {
            userName: search["userName"],
            app: search["app"],
            fileName: search["file"],
            formItems: null,
        };
        this.formRef = React.createRef();
    }

    componentDidMount(){
        switch (this.state.app) {
            case "app1":
                axios.get("http://101.200.153.106:3389/files/"+this.state.fileName)
                    .then(response => {
                        this.generateForm(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                break;
            case "app2":
                this.ocrRequest("general");
                break;
            case "app3": break;
            case "app4": break;
            case "app5": break;
            default:
        }
    }
    ocrRequest(ocrType){
        message.loading("getting ocr result...", 1);
        axios.get("http://101.200.153.106:3389/ocr",
            {params: {"userName": this.state.userName, "fileName": this.state.fileName, "ocrType": ocrType}})
            .then(response => {
                this.generateForm(response.data)
        }).catch(function (error) {
            message.error(error);
        });
    }
    generateForm(data){
        // 生成表单
        let dic = {};
        const s = data.split("\n");
        for(let i=0;i<s.length;i++){
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
            <div>
                <Form ref={this.formRef} labelCol={{span:6}}>
                    {this.state.formItems}
                </Form>
            </div>
        );
    }
}

export default AppExample;