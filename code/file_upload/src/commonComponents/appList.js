import React from "react";
import { Modal } from "antd";
import "./appList.css"
import {Link} from "react-router-dom";

class AppList extends React.Component{
    handleCancel(){
        this.props.setVisibility();
    }
    handelClick(app){
        this.props.setSelectedApp(app);
    }
    render(){
        return (
            <Modal
                width={"400px"}
                visible={this.props.visible}
                title="Choose an app to open"
                footer={null}
                onCancel={() => this.handleCancel()}
            >
                <ul className={"apps"}>
                    <li onClick={() => this.handelClick(1)}>
                        <Link to={{pathname:"/appExample",
                                   search: JSON.stringify({"userName":this.props.userName, "app": "app1", "file": this.props.file})}}
                              target={"_blank"}>
                            <div className={"app"}>
                                <span className={"appIcon"}>S</span><span className={"appName"}>Simple Text</span>
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => this.handelClick(2)}>
                        <Link to={{pathname:"/appExample",
                                   search: JSON.stringify({"userName":this.props.userName, "app": "app2", "file": this.props.file})}}
                              target={"_blank"}>
                            <div className={"app"}>
                                <span className={"appIcon"}>G</span><span className={"appName"}>General</span>
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => this.handelClick(3)}>
                        <Link to={{pathname:"/appExample",
                                   search: JSON.stringify({"userName":this.props.userName, "app": "app3", "file": this.props.file})}}
                              target={"_blank"}>
                            <div className={"app"}>
                                <span className={"appIcon"}>R</span><span className={"appName"}>Receipt</span>
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => this.handelClick(4)}>
                        <Link to={{pathname:"/appExample",
                                   search: JSON.stringify({"userName":this.props.userName, "app": "app4", "file": this.props.file})}}
                              target={"_blank"}>
                            <div className={"app"}>
                                <span className={"appIcon"}>A</span><span className={"appName"}>APP 4</span>
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => this.handelClick(5)}>
                        <Link to={{pathname: "https://app.diagrams.net/",}}
                              target={"_blank"}>
                            <div className={"app"}>
                                <span className={"appIcon"}>A</span><span className={"appName"}>APP 5</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </Modal>
        );
    }
}

export default AppList;