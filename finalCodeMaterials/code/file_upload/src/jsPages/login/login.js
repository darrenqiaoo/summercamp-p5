import React from "react";
import "antd/dist/antd.css";
import {Modal, Button, Form, Input, message, Checkbox} from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, KeyOutlined } from "@ant-design/icons";
import axios from "axios";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }
    handleLogin(){
        //登录事件处理
        const values = this.formRef.current.getFieldValue(); //获取表单内容
        const user  = values["userName"];
        const pwd = values["password"];
        const remember = values["remember"];
        if(user && pwd){
            axios.get("http://101.200.153.106:3389/login", {
                // 向后端验证用户名和密码
                params: {
                    userName: user,
                    password: pwd,
                }}).then((response) => {
                let data = response.data; // 后端响应
                if(data===1){
                    // 用户名和密码正确，登录
                    this.props.setUserName(user);
                    if(remember){
                        localStorage.setItem("lastUser", user);
                    }
                    this.props.setVisibility(false);
                }else {
                    // 密码错误或用户名不存在
                    message.error("wrong password or user not exist!");
                }
            }).catch(function (error) {
                message.error(error);
            });
        }
    }
    handleCancel(){
        // 不登录
        this.props.setVisibility(false);
    }
    render() {
        return (
            <Modal
                width={"450px"}
                visible={this.props.visible}
                title="Login"
                footer={null}
                onCancel={() => this.handleCancel()}
            >
                <Form ref={this.formRef} labelCol={{span:6}}>
                    <Form.Item name={"userName"} rules={[{required: true}]}>
                        {}
                        <Input size="large" placeholder="user name" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name={"password"} rules={[{required: true}]}>
                        <Input.Password
                            placeholder="password"
                            prefix={<KeyOutlined />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
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