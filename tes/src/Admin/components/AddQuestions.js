import React,{Component} from 'react';
import {getQuestionsOfTemplate,saveQuestion} from '../../services/QuestionService';
import QuestionList from './QuestionsList';
import { message, Input, Button } from 'antd';
class AddQuestions extends Component{

    constructor(props){
        super(props);
        this.updateQuestionList = this.updateQuestionList.bind(this);
        this.state = {
            questionList :[],
            questionText:''
        }
    }

    
    componentDidMount(){
        message.loading("loading");
        const {tId = -1} = this.props || {};
        const questionsPromise = getQuestionsOfTemplate(tId);
        questionsPromise.then(res => {
            res.json().then(data => {
                this.setState({
                    questionList:data
                });
                message.destroy();
            })
        });
    }

    handleInput(e){
        this.setState({
            questionText:e.target.value
        });
    }

    updateQuestionList(data){
        this.setState({
            questionList:data
        });
    }

    saveQuestion(){
        const {tId = -1} = this.props || {};
        let quest = {
            Question:this.state.questionText,
            tid:tId
        }
        message.loading("Adding Question");
        const saveQuestionPromise = saveQuestion(quest) || {};
        saveQuestionPromise.then(res => {
           if(res.ok){
               message.destroy();
               message.success("Question Saved");
            res.json().then(data =>{
                
                //console.log(data)
                this.setState({
                    questionList:data
                });
            });
           }
        })
    }
    render(){
        const {readonly = true,tId = -1} = this.props || {}
        if(readonly){
            return <QuestionList readonly={true} QuestionList={this.state.questionList}/>
        }else{
            return <>
                <table><tr><td><Input type="text" placeholder="New Question" onChange={this.handleInput.bind(this)}/></td><td><Button icon="plus" onClick={this.saveQuestion.bind(this)}>Add</Button></td></tr></table>
                <QuestionList readonly={false} QuestionList={this.state.questionList} updateState = {this.updateQuestionList}/>
            </>
        }
    }
}
 

export default AddQuestions;