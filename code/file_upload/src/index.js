import React from 'react';
import ReactDOM from 'react-dom';
import PageFileUpload from "./jsPages/fileUpload/FileField";
import PageInfoExtract from "./jsPages/fileExtract/infoExtract";


class AppEntry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            curPage: 0,
            files: [],
        };
        this.setPage = this.setPage.bind(this);
        this.setFiles = this.setFiles.bind(this);
    }

    setPage(page){
        this.setState({
            curPage: page,
        });
    }
    setFiles(files){
        this.setState({
            files:files,
        });
    }
    render() {
        const page = this.state.curPage;
        let pageUpload = <PageFileUpload setPage={this.setPage}
                                         files={this.state.files}
                                         setFiles={this.setFiles}/>;
        let pageExtract = <PageInfoExtract setPage={this.setPage}
                                           files={this.state.files}/>;
        let content;
        switch (page) {
            case 0: content = pageUpload;break;
            case 1: content = pageExtract;break;
            default:
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

ReactDOM.render(
    <AppEntry />,
  document.getElementById('root')
);

