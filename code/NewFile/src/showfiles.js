//这也就是我们想要展示文件的页面；
//哪个页面需要路由文件，哪个页面就把配置的路由引入进来；

import React from "react"
import {Link} from "react-router-dom"

class Showfiles extends React.Component{
    render(){
        //len保存上传至localstorage的文件数目；
        const len=localStorage.length;
        //res存放结果；
        let res=[];
        //给所有上传至localstorage的文件，并在页面上显示出来的文件名加上链接；
        for(let i=0;i<len;i++)
        {
            //name保存获取的文件名；
            const name=localStorage.key(i);        
            //path变量保存路径和文件名；    
            var path={
                pathname:'/Showcontent',  //路径名
                state:name,               //文件名
            }
            //以链接方式显示
            res.push(
                    <Link to={path} style={{color:'black'}}>
                        {/*显示文件名称，可以点击进行页面跳转*/} 
                        <div> {localStorage.key(i)} </div>   
                    </Link>
                    )
            //res.push(<div>{localStorage.key(i)}</div>);
        }
        //渲染；
        return(
            <div>
                以下是上传至localstorage的文件，点击显示文件内容：
                {res}
            </div>
        )
    }
}

//可以被外部使用；
export default Showfiles;