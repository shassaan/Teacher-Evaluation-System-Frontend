import React, { Component } from 'react';
import { Input, Button, Icon, Popconfirm, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { delQuestion, getQuestionsOfTemplate, updateQuestion } from '../../services/QuestionService';
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayInput: 'none',
            displayText: '',
            text:this.props.Question.question
        }
    }

    deleteQuestion() {
        message.loading("Deleting")
        const { Question = {} } = this.props || {};
        console.log(Question.tid);
        const delQuestionPromise = delQuestion(Question.questionId) || {};
        delQuestionPromise.then(res => {
           if(res.ok){
                message.destroy();
                message.success("Deleted Successfuly");
                const promise = getQuestionsOfTemplate(Question.tid);
                promise.then(res1=>{
                    if(res1.ok){
                        res1.json().then(data =>{
                            //console.log(data);
                            this.props.updateState(data);
                        })
                    }
                });

           }
        });

    }

    handleTextChange(e){
        this.setState({
            text:e.target.value
        });
    }

    saveChanges(){
        message.loading("Updating");
        const { Question = {} } = this.props || {};
        const id = Question.questionId;
       Question.question = this.state.text;
       var promise = updateQuestion(id,Question);
       promise.then(res => {
           if(res.ok){
               message.destroy();
               message.success("Updated");
               var p = getQuestionsOfTemplate(Question.tid);
               p.then(res1 => {
                   if(res1.ok){
                        res1.json().then(data => {
                            this.props.updateState(data);
                            this.setState({
                                displayInput: 'none',
                                displayText: '',
                                text: this.props.Question.question
                            })
                        });
                   }
               });
           }
       });
    }

    render() {
        const { Question = {} } = this.props || {};
        if(this.props.readonly){
            return (
                <>
                
                    <p><b>Q: </b>{Question.question}</p>
    
                </>
    
            );
        }else{
            return (
                <>
                    <table style={{ display: this.state.displayInput }}>
    
                        <tr>
                            <td><TextArea cols={50} onChange={this.handleTextChange.bind(this)}>{Question.question}</TextArea></td>
                        </tr>
                        <tr>
                            <td><Button icon="check" type="default" onClick={this.saveChanges.bind(this)}>Save Changes</Button></td>
                            <td><Button icon="cross" type="danger" onClick={() => {
                                this.setState({
                                    displayInput: 'none',
                                    displayText: '',
                                    text: this.props.Question.question
                                })
                            }}>Cancel</Button></td>
                        </tr>
                    </table>
                    <p onDoubleClick={() => {
                        this.setState({
                            displayInput: '',
                            displayText: 'none'
                        })
                    }} style={{ display: this.state.displayText }}><b>Q: </b>{Question.question}</p>
                    <Popconfirm title="Are you sure？" onConfirm={this.deleteQuestion.bind(this)} onCancel={() => { return }} icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                        <Icon type="delete"  />
                    </Popconfirm>
                </>
    
            );
        }
    }
}

export default Question;