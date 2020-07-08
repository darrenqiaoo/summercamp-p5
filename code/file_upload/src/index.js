import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class FileField extends React.Component{
    render() {
        return (
            <div className="fileField">
                <p className="tips1">Drop and open files in Citrix Workspace</p>
                <p className="tips2">Hold <span className="shift_icon">shift</span> to upload to Ctrix Files directly</p>
            </div>
        );
    }
}

ReactDOM.render(
    <div className={"fUpload_area"}>
        <FileField />
    </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
