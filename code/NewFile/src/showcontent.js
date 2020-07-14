import React from "react"

class Showcontent extends React.Component{
    render(){
        //let res=[];
        //res.push(<div> {localStorage.getItem(localStorage.key(0))} </div>)
        return(
            <div>
                {/*这里this.props.location.state就等于showfiles文件里面的state值，也就是文件名*/}
                {this.props.location.state}  

                {/*显示对应文件名的内容，使用localstorage的getItem方法来获取*/}
                {<div> {localStorage.getItem(this.props.location.state)} </div>}
                
                {/*res*/}
            </div>
        )
    }
}
//可以被外部使用；
export default Showcontent;