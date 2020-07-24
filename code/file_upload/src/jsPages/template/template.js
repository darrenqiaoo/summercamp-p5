import React from 'react';
import 'antd/dist/antd.css';
import './template.css';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    FileAddOutlined,
    FolderOutlined,
} from '@ant-design/icons';
import UploadPage from "../fileUpload/uploadPage";
import ExtractPage from "../fileExtract/extractPage";

const { Header, Sider, Content } = Layout;

class MyTemplate extends React.Component {
    constructor(props) {
        super(props);
        let storage = []; //读取localstorage初始文件
        for(let i=0;i<localStorage.length;i++){
            storage.push(localStorage.key(i));
        }
        this.state = {
            collapsed: false,
            curPage: "upload",
            files: storage,
            height: window.innerHeight,
        };
        this.setFiles = this.setFiles.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
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
    render() {
        let content;
        switch (this.state.curPage) {
            case "upload": content = <UploadPage files={this.state.files} setFiles={this.setFiles}/>;break;
            case "extract": content = <ExtractPage files={this.state.files} setFiles={this.setFiles}/>;break;
            default:
        }
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
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
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: this.state.height-115,
                        }}
                    >
                        {content}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MyTemplate;