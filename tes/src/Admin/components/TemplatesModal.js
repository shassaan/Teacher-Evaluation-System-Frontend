import React,{Component} from 'react';
import {Modal} from 'antd';
class TemplatesModal extends Component{

    
    constructor(props){
        super(props);
        this.state = {
            show:this.props.show
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
                
            </>
        );
    }
}

export default TemplatesModal;