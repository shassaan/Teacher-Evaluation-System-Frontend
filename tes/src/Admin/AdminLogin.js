import React ,{Component} from 'react';
import {
    Form, Icon, Input, Button,
} from 'antd';

class AdminLogin extends Component{
    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1><span><Icon type="login" style={{ color: 'green' }}></Icon></span> Login</h1>
                    <Form.Item>

                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />

                    </Form.Item>
                    <Form.Item>

                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />

                    </Form.Item>
                    <Form.Item>




                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>{
                                    this.props.updateAuth(true);
                            }}>
                            Log in
            </Button><br />

                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default AdminLogin;