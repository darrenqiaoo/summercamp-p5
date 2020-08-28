import React from "react";
import { Modal } from "antd";
import "./appList.css"
import {Link} from "react-router-dom";
import {DropboxOutlined, EditOutlined, FontSizeOutlined, DollarOutlined} from "@ant-design/icons"

class AppList extends React.Component{
    handelClick(){
        this.props.setSelectedApp();
    }
    render(){
        return (
            <Modal
                width={"400px"}
                visible={this.props.visible}
                title="Choose an app to open"
                footer={null}
                onCancel={() => this.handelClick()}
            >
                <ul className={"apps"}>
                    <li onClick={() => this.handelClick()} style={{display: "block"}}>
                        <div className={"app"}>
                            <span className={"appIcon"} style={{backgroundColor: "rgb(0, 109, 217)"}}><DropboxOutlined /></span>
                            <span className={"appName"}>DropBox</span>
                        </div>
                    </li>
                    <li onClick={() => this.handelClick()} style={{display: this.props.app[0]}}>
                        <Link to={{pathname:"http://101.200.153.106:3000/markdown",
                                   search: encodeURIComponent(this.props.file)}}
                              target={"_blank"}>
                            <div className={"app"}>
                                <span className={"appIcon"} style={{backgroundColor: "rgb(101, 211, 119)"}}><EditOutlined /></span>
                                <span className={"appName"}>Markdown</span>
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => this.handelClick()} style={{display: this.props.app[1]}}>
                        <Link to={{pathname:"http://101.200.153.106:3000/invoice",
                                   search: encodeURIComponent(this.props.file)}}
                              target={"_blank"}>
                            <div className={"app"}>
                                <span className={"appIcon"} style={{backgroundColor: "rgb(248, 206, 94)"}}><DollarOutlined /></span>
                                <span className={"appName"}>Receipt</span>
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => this.handelClick()} style={{display: this.props.app[2]}}>
                        <Link to={{pathname:"http://101.200.153.106:3000/translate",
                                   search: encodeURIComponent(this.props.file)}}
                              target={"_blank"}>
                            <div className={"app"}>
                                <span className={"appIcon"} style={{backgroundColor: "rgb(203, 43, 41)"}}><FontSizeOutlined /></span>
                                <span className={"appName"}>Translate</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </Modal>
        );
    }
}

export default AppList;
