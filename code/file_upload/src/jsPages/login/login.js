import React from "react";
import "antd/dist/antd.css";
import {Modal, Button, Form, Input, message} from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, KeyOutlined } from "@ant-design/icons";
import axios from "axios";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
        this.formRef = React.createRef();
    }
    handleLogin(){
        //登录事件处理
        const values = this.formRef.current.getFieldValue(); //获取表单内容
        const userName  = values["userName"];
        const password = values["password"];
        axios.get("http://101.200.153.106:3389/login", {
            // 向后端验证用户名和密码
            params: {
                userName: userName,
                password: password,
            }}).then(response => {
            let data = response.data; // 后端响应
            if(data===1){
                // 用户名和密码正确，登录
                this.props.setUserName(userName);
                this.setState({
                    // 隐藏登录窗口
                    visible: false,
                });
            }else {
                // 密码错误或用户名不存在
                message.error("wrong password or user not exist!");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    handleCancel(){
        // 不登录
        this.setState({
            visible: false,
        });
    }
    render() {
        return (
            <Modal
                width={"400px"}
                visible={this.state.visible}
                title="Login"
                footer={null}
                onCancel={() => this.handleCancel()}
            >
                <Form ref={this.formRef} labelCol={{span:6}}>
                    <Form.Item name={"userName"} rules={[{required: true}]}>
                        {}
                        <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name={"password"} rules={[{required: true}]}>
                        <Input.Password
                            placeholder="input password"
                            prefix={<KeyOutlined />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 10,span: 8,}}>
                        <Button type="primary" htmlType="submit" onClick={() => this.handleLogin()}>Login</Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
export default Login;