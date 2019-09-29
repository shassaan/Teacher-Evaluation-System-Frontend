import React ,{Component} from 'react';
import {
    Form, Icon, Input, Button, message,
} from 'antd';

class AdminLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            pass:'',
            email:''
        }
    }

    handleChangePass(e){
        this.setState({
            pass:e.target.value,
        });
    }

    handleChangeEmail(e){
        this.setState({
            email:e.target.value,
        });
    }
    render(){
        return(
            <div className="container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1><span><Icon type="login" style={{ color: 'green' }}></Icon></span> Login</h1>
                    <Form.Item>

                        <Input onChange={this.handleChangeEmail.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="User Name" />

                    </Form.Item>
                    <Form.Item>

                        <Input onChange={this.handleChangePass.bind(this)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />

                    </Form.Item>
                    <Form.Item>




                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>{
                             if(this.state.pass == "123" && this.state.email == "admin"){
                                this.props.updateAuth(true);
                             }else{
                                 message.error("Incorrect username or password");
                             }
                                    
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