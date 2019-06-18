import React, { Component } from 'react';
import {Card, Button,Modal} from 'antd';
import {Container} from 'reactstrap';
import AddQuestions from './AddQuestions';
class Template extends Component  {
    
    constructor(props){
        super(props);
        this.addQuestions = this.addQuestions.bind(this);
        this.state = {
            modalVisibilty:false,
            isReadonly:false
        }
    }
    
    addQuestions(tid,isReadonly){
        this.setState({
            modalVisibilty:true,
            isReadonly:isReadonly
        });
    }

    render(){
        const {Template = {}} = this.props || {};
        return (
            <Container>
            <Card  title={Template.tName} bordered={true}>
                    <div>
                        <table><tr><td><Button icon="plus" type="dashed" onClick={()=>{this.addQuestions(Template.id,false)}}></Button></td><td><Button icon="eye" type="ghost" onClick={()=>{this.addQuestions(Template.id,true)}}></Button></td></tr></table>
                    </div>
                </Card>
                <Modal
                    title={(this.state.isReadonly ?'View questions of ' :'Add questions to ')+Template.tName+' template'}
                    style = {{top:20}}
                    visible={this.state.modalVisibilty}
                    footer={false}
                    onCancel = {(e)=>{this.setState({modalVisibilty:false})}}
                >
                <AddQuestions readonly={this.state.isReadonly} tId = {Template.id}/>
                </Modal>
            </Container>

        );
        
        }
            
}

export default Template;