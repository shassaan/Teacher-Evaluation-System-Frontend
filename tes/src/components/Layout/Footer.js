import React,{ Component } from "react";
import {Layout} from 'antd';
const {Footer} = Layout;
class MyFooter extends Component{
    render(){
        return (
            <Footer style={{ textAlign: 'center' ,marginTop:'10%'}}>BIIT ©2019 Developed  By Syed Hassaan Ahmed.</Footer>
        );
    }
}

export default MyFooter;
