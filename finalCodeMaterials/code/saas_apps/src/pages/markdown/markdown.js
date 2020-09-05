import React from "react";
import "./markdown.css"
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import 'react-markdown-editor-lite/lib/index.css';
import axios from "axios";
import {Button, message} from "antd";

export default class Markdown extends React.Component{
    constructor(props) {
        super(props);
        let file = decodeURIComponent(this.props.location.search);
        file = file.substr(1, file.length);
        this.state = {
            mdParser: new MarkdownIt(),
            file: file,
            value: ""
        };
    }
    componentDidMount() {
        if(this.state.file) {
            axios.get("http://101.200.153.106:3389/markdown", {
                params: {file: this.state.file}
            }).then(response => {
                this.setState({
                    value: response.data
                });
            }).catch(e => {
                console.log(e);
            })
        }
    }
    handleEditorChange (e) {
        this.setState({
            value: e.text,
        });
    }
    handleClick(){
        axios.post("http://101.200.153.106:3389/markdown",
            {params: {file: this.state.file, data: this.state.value}})
            .catch(function (error) {
                message.error(error);
            });
    }
    render(){
        return (
            <div>
                <div style={{height: 400}}>
                    <MdEditor style={{width: "100%", height:"100%"}}
                              value={this.state.value}
                              renderHTML={(text) => this.state.mdParser.render(text)}
                              onChange={(e)=>this.handleEditorChange(e)}
                    />
                </div>
                <div style={{marginTop: 20, textAlign: "center"}}>
                    <Button type="primary" htmlType="submit" onClick={()=>this.handleClick()}>Submit</Button>
                </div>
            </div>
        );
    }

}