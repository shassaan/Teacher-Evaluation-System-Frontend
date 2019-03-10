import React,{ Component } from "react";
import './styles/MainPageContent.css';
import {Row,Col} from 'antd'
import logo from '../../assets/logo.png';
import LoginForm from '../specialComponents/login';

class MainPageContent extends Component{
    render(){
        return (
            
            <Row>
           
                <Col xs={24} sm={6} md={6} lg={8} xl={10}>
                
                   <img src={logo} alt="Hello"/>
                </Col>
                <Col xs={24} sm={6} md={6} lg={8} xl={10}>
                
                    <LoginForm/>
                </Col>
            </Row>
            

            
        );
    }
}



export default MainPageContent;