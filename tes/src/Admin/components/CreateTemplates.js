import React, { Component } from 'react';
import { Button, Input ,message} from 'antd';
import { Container } from 'reactstrap';
import TemplatesModal from './TemplatesModal';
import {Modal} from 'antd';
import TemplateList from './TemplateList';
import {getTemplates,postTemplate} from '../../services/TemplateService';
class CreateTemplates extends Component {
    state = {
        modalVisibilty:false,
        template:{
            TName:''
        },
        templateList:[]
    }


    handleCancel(){
        this.setState({
            modalVisibilty:false
        });
    }

    handleOk(){
        this.setState({
            modalVisibilty:false
        });
    }
    handleClick(){
        this.setState({
            modalVisibilty:true
        });
    }

    handleInput(e){
        this.setState({
            template:{
                TName:e.target.value
            }
        });
    }


    componentDidMount(){
        
        const templatePromise= getTemplates() || {};
        templatePromise.then((res) => {
            if(res.ok){
                res.json().then(templates => {
                    this.setState({
                        modalVisibilty:false,
                        templateList:templates
                    });
                })
            }
        }).catch(err => message.error("Error Loading Templates"));
    }

    postTemplate(){
        let templates = this.state.template;
        console.log(templates);
        message.loading("Saving Data",1000);
        const postPromise = postTemplate(templates) || {};
        postPromise.then(res => {
        if(res.ok){
            res.json().then(json=>{
                message.destroy();
                message.success("Data Saved");
                this.setState({
                    modalVisibilty:false,
                    templateList:json
               });
            });
        }
    }).catch(err =>{
        message.destroy();
        message.error("Error Occured while saving");
    });
        
    }
    
    render() {
        return (
            <Container>
                <h2>📋  Create Templates</h2>
                <Button type="primary" icon="plus" onClick={this.handleClick.bind(this)}>
                    New
                </Button>
                <Modal
                    title="Create Template"
                    visible={this.state.modalVisibilty}
                    onCancel={this.handleCancel.bind(this)}
                    footer={false}
                >
                   <table style={{width:'100%'}}><tr><td><Input type="text" placeholder="Template Name" onChange={this.handleInput.bind(this)}/></td><td><Button type="primary" onClick={this.postTemplate.bind(this)}>Create</Button></td></tr></table>
                </Modal>
                <TemplateList templateList={this.state.templateList}/>
            </Container>
        );
    }
}

export default CreateTemplates;