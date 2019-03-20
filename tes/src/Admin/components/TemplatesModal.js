import React,{Component} from 'react';
import {Modal} from 'antd';
class TemplatesModal extends Component{

    
    constructor(props){
        super(props);
        this.state = {
            show:true
        }
    }

    handleCancel(){
        this.setState({
            show:false
        });
    }

    handleOk(){
        this.setState({
            show:false
        });
    }
    render(){        
        return (
            <>
                <Modal
                    title="Create Template"
                    visible={this.state.show}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okButtonProps={{ disabled: true }}
                    cancelButtonProps={{ disabled: true }}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        );
    }
}

export default TemplatesModal;