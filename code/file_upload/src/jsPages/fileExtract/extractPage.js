import React from "react";
import FileList from "../../commonComponents/fileList";
import "./extractPage.css"
import { Form, Input, Button} from "antd"


class ExtractPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fileContent: "",
        };
        this.showFileContent = this.showFileContent.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.formRef = React.createRef();
    }
    showFileContent(file_name){
        const s = localStorage.getItem(file_name).split('\n');
        let dic = {};
        for(let i=0;i<s.length;i++){
            const temp = s[i].split(':');
            dic[temp[0]] = temp[1];
        }
        this.setState({
            fileContent: localStorage.getItem(file_name),
        });
        this.formRef.current.setFieldsValue(dic);
    }
    handleReset(){
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
                        <textarea id={"fileContent"} value={this.state.fileContent||""} readOnly={true} />
                    </div>
                    <div className={"extractBottom"}>
                        <div className={"infoFormBox"}>
                            <Form ref={this.formRef} labelCol={{span:6}}>
                                <Form.Item name={"Name"} label={"Name"} rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={"Age"} label={"Age"} rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={"Tel"} label={"Tel"} rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={"Email"} label={"Email"} rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={"City"} label={"City"} rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={"Intention"} label={"Intention"} rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item wrapperCol={{offset: 12,span: 16,}}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
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