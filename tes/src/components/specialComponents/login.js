import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Radio,
} from 'antd';
import RadioButton from 'antd/lib/radio/radioButton';


class LoginForm extends Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1><span><Icon type="login" style={{ color: 'green' }}></Icon></span> Login</h1>
                    <Form.Item>

                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Reg No." />
                    </Form.Item>
                    <Form.Item>

                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />

                    </Form.Item>
                    <Form.Item>
                        <Radio name="type">Teacher</Radio>
                        <Radio name="type">Student</Radio>
                    </Form.Item>
                    <Form.Item>
                        <a className="login-form-forgot" href="">Forgot password</a><br />
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => { this.props.updateUserAuth(true); }}>
                            Log in
            </Button><br />

                    </Form.Item>
                </Form>
            </div>
        );
    }
}


export default LoginForm;