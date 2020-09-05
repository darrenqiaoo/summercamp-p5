import React from "react";
import axios from "axios";
import "./translate.css"
import {AppstoreOutlined,BarsOutlined,AndroidOutlined,AppleOutlined,FileOutlined,FontSizeOutlined} from "@ant-design/icons"

class Translate extends React.Component{
    constructor(props) {
        super(props);
        let file = decodeURIComponent(this.props.location.search);
        file = file.substr(1, file.length);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            file: file,
            origin: "",
            translation: "",
        };
        this.translate = this.translate.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
        if(this.state.file){
            axios.get("http://101.200.153.106:3389/translate", {
                params: {file: this.state.file}
            }).then(response => {
                if(typeof response.data==="string"){
                    alert(response.data);
                }
                else {
                    this.setState({
                        origin: response.data["trans_result"][0]["src"],
                        translation: response.data["trans_result"][0]["dst"],
                    });
                }
            }).catch(e => {
                console.log(e);
            })
        }
    }
    handleResize = e => {
        this.setState({
            width: e.target.innerWidth,
            height: e.target.innerHeight,
        });
    };
    handleTextareaChange(e){
        this.setState({
            origin: e.target.value,
            translation: "",
            });
    }
    translate() {
        if(this.state.origin.length===0){
            return ;
        }
        axios.get("http://101.200.153.106:3389/translate", {
            params: {
                origin: this.state.origin
            }})
            .then(response => {
                if (typeof response.data==="string"){
                    alert(response.data)
                }else {
                    const transResult = response.data["trans_result"];
                    let translation = "";
                    for(let i=0;i<transResult.length;i++){
                        translation += transResult[i]["dst"]+"\n";
                    }
                    this.setState({
                        translation: translation,
                    });
                }
            })
            .catch( e=> {
                console.log(e);
            });
    }
    handelClick(){
        this.translate();
    }
    render(){
        return (
            <div className={"fatherBox"}
                 style={{height: this.state.height,
                     width: this.state.width,
                     backgroundColor: "rgb(255,255,255)",}}>
                <div className={"head"}>
                    <span><BarsOutlined /></span>
                    <div className={"head-title"}>
                        <span>R</span><span>e</span><span>a</span><span>c</span><span>t</span><span>Translate</span>
                    </div>
                    <span><AppstoreOutlined /></span>
                </div>
                <div className={"extensions"}>
                    <div><span><FontSizeOutlined /></span><span>Text</span></div>
                    <div><span><FileOutlined /></span><span>File</span></div>
                    <div><span><AppleOutlined /></span><span>IOS</span></div>
                    <div><span><AndroidOutlined /></span><span>Android</span></div>
                    <div><span>Click to download App</span></div>
                </div>
                <div className={"translate"}>
                    <div className={"translate-options"}>
                        <span style={{width: this.state.width/2-20,}}>Original Text</span>
                        <span style={{width: this.state.width/2-20,}}>Translation Text</span>
                    </div>
                    <div className={"translate-body"}>
                        <textarea style={{width: this.state.width/2-20, }}
                                  className={"translateInput"}
                                  onChange={e=>this.handleTextareaChange(e)}
                                  value={this.state.origin}/>
                        <textarea style={{width: this.state.width/2-21, }}
                                  className={"translateResult"}
                                  readOnly={true}
                                  value={this.state.translation}/>
                    </div>
                </div>
                <div className={"submit"}>
                    <button className={"translateBtn"} onClick={()=>this.handelClick()}>translate</button>
                </div>
            </div>
        );
    }
}

export default Translate;