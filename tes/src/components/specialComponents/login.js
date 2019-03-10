import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Radio,
} from 'antd';
import RadioButton from 'antd/lib/radio/radioButton';


class LoginForm extends Component {


    render() {

        return (
            <div style={{border:'1px dashed black',padding:'10px',textAlign:'center',borderRadius:'10px'}}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1><span><Icon type="login" style={{color:'green'}}></Icon></span> Login</h1>
                    <Form.Item>

                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Reg No." />

                    </Form.Item>
                    <Form.Item>

                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />

                    </Form.Item>
                    <Form.Item>
                        <Radio>Teacher</Radio>
                        <Radio>Student</Radio>
                    </Form.Item>
                    <Form.Item>



                        <a className="login-form-forgot" href="">Forgot password</a><br />
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
            </Button><br />

                    </Form.Item>
                </Form>
            </div>
        );
    }
}


export default LoginForm;