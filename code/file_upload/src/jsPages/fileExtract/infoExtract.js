import React from "react";
import './infoExtract.css'
import FileList from "../../commonComponents/fileList";
import FileShowBox from "../../commonComponents/fileShowBox";
import {Link} from "react-router-dom";

class PageInfoExtract extends React.Component{
    constructor(props) {
        super(props);
        let storage = [];
        for(let i=0;i<localStorage.length;i++){
            storage.push(localStorage.key(i));
        }
        this.state = {
            files: storage,
            showText: "",
            inputValues: {},
        };
        this.setShowText = this.setShowText.bind(this);
        this.handelInputChange = this.handelInputChange.bind(this);
    }
    setShowText(text){
        const s = text.split('\n');
        let dic = {};
        for(let i=0;i<s.length;i++){
            const temp = s[i].split(':');
            dic[temp[0]] = temp[1];
        }
        this.setState({
            showText: text,
            inputValues: dic,
        });
    }
    handelInputChange(e){
        let dic = this.state.inputValues;
        const id = e.target.getAttribute("id")
        switch(id){
            case "name": dic["Name"] = e.target.value;break;
            case "age": dic["Age"]  = e.target.value;break;
            case "tel": dic["Tel"]  = e.target.value;break;
            case "email": dic["Email"]  = e.target.value;break;
            case "city": dic["City"]  = e.target.value;break;
            case "intention": dic["Intention"]  = e.target.value;break;
            default:
        }
        this.setState({
            inputValues: dic,
        });
    }
    render() {
        return (
            <div className={"infoExtract"}>
                <div className={"tips"}>Click the file you want to start autofill.</div>
                <div className={"leftBox"}>
                    <Link to={"/"}>
                        <button className={"back"}>previous page</button>
                    </Link>
                    <FileList className={"fileList"} files={this.state.files} setShowText={this.setShowText}/>
                </div>
                <div className={"rightBox"}>
                    <div className={"topBox"}>
                        <FileShowBox className={"FileShowBox"} id={"FileShowBox"} value={this.state.showText}/>
                    </div>
                    <div className={"bottomBox"}>
                        <form className={"infoForm"}>
                            <div className={"formItem"}>
                                <span className={"formKey"}>Name</span><span>:</span>
                                <input id={"name"} type={"text"}
                                       value={this.state.inputValues['Name']||''}
                                       onChange={this.handelInputChange}/>
                            </div>
                            <div className={"formItem"}>
                                <span className={"formKey"}>Age</span><span>:</span>
                                <input id={"age"} type={"number"}
                                       value={this.state.inputValues['Age']||''}
                                       onChange={this.handelInputChange}/>
                            </div>
                            <div className={"formItem"}>
                                <span className={"formKey"}>Tel</span><span>:</span>
                                <input id={"tel"} type={"tel"}
                                       value={this.state.inputValues['Tel']||''}
                                       onChange={this.handelInputChange}/>
                            </div>
                            <div className={"formItem"}>
                                <span className={"formKey"}>E-mail</span><span>:</span>
                                <input id={"email"} type={"email"}
                                       value={this.state.inputValues['Email']||''}
                                       onChange={this.handelInputChange}/>
                            </div>
                            <div className={"formItem"}>
                                <span className={"formKey"}>City</span><span>:</span>
                                <input id={"city"} type={"text"}
                                       value={this.state.inputValues['City']||''}
                                       onChange={this.handelInputChange}/>
                            </div>
                            <div className={"formItem"}>
                                <span className={"formKey"}>Intention</span><span>:</span>
                                <input id={"intention"} type={"text"}
                                       value={this.state.inputValues['Intention']||''}
                                       onChange={this.handelInputChange}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageInfoExtract;