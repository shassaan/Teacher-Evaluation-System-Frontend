import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Radio, message,
} from 'antd';
import RadioButton from 'antd/lib/radio/radioButton';
import { login } from '../../services/LoginService';


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            password:'',
            Identity:''
        }
    }

    handleIdentityChange(e){
        this.setState({
            password:this.state.password,
            Identity:e.target.value
        });
    }

    handlePasswordChange(e){
        this.setState({
            password:e.target.value,
            Identity:this.state.Identity
        });
    }


    handleClick(){
        console.log(this.state);
        message.loading("Logging in..");
        const loginPromise =  login(this.state);
        loginPromise.then(res => {
            if(res.ok){
                res.json().then(data => {
                    if(data.type == "teacher"){
                            message.destroy();
                        this.props.updateUserAuth(true,data);
                        
                    }else if(data.type == "student"){
                        message.destroy();
                        this.props.updateUserAuth(true,data);
                    }else{
                        message.destroy();
                        message.error("Identity or Password is Wrong");
                    }
                })
            }
        })
        //this.props.updateUserAuth(this.state.auth);
    }




    
    render() {

        return (
            <div className="container">
                <Form className="login-form">
                    <h1><span><Icon type="login" style={{ color: 'green' }}></Icon></span> Login</h1>
                    <Form.Item>

                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.handleIdentityChange.bind(this)} placeholder="Enter your Identity" />
                    </Form.Item>
                    <Form.Item>

                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onChange={this.handlePasswordChange.bind(this)} placeholder="Password" />

                    </Form.Item>
                    <Form.Item>
                        <a className="login-form-forgot" href="">Forgot password</a><br />
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleClick.bind(this)}>
                            Log in
                  </Button><br />
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


export default LoginForm;