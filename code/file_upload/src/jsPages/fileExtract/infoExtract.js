import React from "react";
import './infoExtract.css'
import FileList from "../../commonComponents/fileList";
import FileShowBox from "../../commonComponents/fileShowBox";

class PageInfoExtract extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files,
            showText: "",
        };
        this.prePage = this.prePage.bind(this);
        this.setShowText = this.setShowText.bind(this);
    }
    prePage(){
        this.props.setPage(0);
    }
    setShowText(text){
        this.setState({
            showText: text,
        });
    }
    render() {
        return (
            <div className={"infoExtract"}>
                <div className={"leftBox"}>
                    <button className={"back"} onClick={this.prePage}>previous page</button>
                    <FileList className={"fileList"} files={this.props.files} setShowText={this.setShowText}/>
                </div>
                <div className={"rightBox"}>
                    <div className={"topBox"}>
                        <FileShowBox className={"FileShowBox"} id={"FileShowBox"} value={this.state.showText}/>
                    </div>
                    <div className={"bottomBox"}>

                    </div>
                </div>

            </div>
        );
    }
}

export default PageInfoExtract;