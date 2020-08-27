import React from "react";
import "antd/dist/antd.css";
import "./template.css";
import {Layout, Menu} from "antd";
import axios from "axios"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    FileAddOutlined,
    FolderOutlined,
} from "@ant-design/icons";
import UploadPage from "../fileUpload/uploadPage";
import ExtractPage from "../fileExtract/extractPage";
import Login from "../login/login";

const { Header, Sider, Content } = Layout;

class MyTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            curPage: "upload",
            files: [],
            height: window.innerHeight,
            loginVisible: false,
            userName: "",
        };
        this.setFiles = this.setFiles.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.loginVisibility = this.loginVisibility.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
        console.log(this.state.height);
        const lastUser = localStorage.getItem("lastUser");
        if(lastUser){
            this.setUserName(lastUser)
        }else {
            this.setState({
                loginVisible: true,
            });
        }
        //const button = document.getElementsByClassName("login")[0];

    }
    handleResize = e => {
        this.setState({
            height: e.target.innerHeight,
        });
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        const userName = document.getElementsByClassName("user-name")[0];
        const userIcon = document.getElementsByClassName("user-icon")[0];
        const loginBtn = document.getElementsByClassName("login")[0];
        userName.style.display = this.state.collapsed?"inline-block":"none";
        loginBtn.style.display = this.state.collapsed?"inline-block":"none";
        userIcon.style.left = this.state.collapsed?"10px":"50%";
        userIcon.style.transform = this.state.collapsed?"translateX(0)":"translateX(-50%)";
    };
    setPage(page){
        this.setState({
            curPage: page,
        });
    }
    setFiles(files){
        this.setState({
            files: files,
        });
    }
    loginVisibility(visible){
        this.setState({
            loginVisible: visible,
        });

    }
    setUserName(userName) {
        this.setState({
            userName: userName,
        });
        axios.get("http://101.200.153.106:3389/getFiles", {
            // 成功登录后获取用户名对应的文件列表
            params: {
                userName: userName,
            }}).then(response => {
            let data = response.data;
            if(data.length>0){
                this.setState({
                    files: data.split(","),
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    handelLoginClick(){
        if(this.state.userName.length>0){
            this.setState({
                userName: "",
                files: [],
            });
            localStorage.removeItem("lastUser");
        }else {
            this.setState({
                loginVisible: true,
            });
        }
    }
    render() {
        let content;
        switch (this.state.curPage) {
            case "upload": content = <UploadPage userName={this.state.userName} files={this.state.files} setFiles={this.setFiles}/>;break;
            case "extract": content = <ExtractPage userName={this.state.userName} files={this.state.files} setFiles={this.setFiles}/>;break;
            default:
        }
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className={"user"}>
                        <div className={"user-icon"}> {this.state.userName[0]}</div>
                        <div className={"user-name"}> {this.state.userName.length>0?this.state.userName:"NULL"} </div>
                        <button className={"login"} onClick={()=>this.handelLoginClick()}> {this.state.userName.length>0?"logout":"login"} </button>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<FileAddOutlined />} onClick={()=>this.setPage("upload")}>
                            Add new files
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FolderOutlined />} onClick={()=>this.setPage("extract")}>
                            My files
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: "trigger",
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: this.state.height-115,
                            maxHeight: 850,
                        }}
                    >
                        {content}
                    </Content>
                </Layout>
                <Login visible={this.state.loginVisible} setVisibility={this.loginVisibility} setUserName={this.setUserName}/>
            </Layout>
        );
    }
}

export default MyTemplate;