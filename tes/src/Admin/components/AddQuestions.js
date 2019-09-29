import React,{Component} from 'react';
import {getQuestionsOfTemplate,saveQuestion} from '../../services/QuestionService';
import QuestionList from './QuestionsList';
import { message, Input, Button, Badge, List, Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { getOptionsOfTemplate,saveOption, deleteOption } from '../../services/optionService';
class AddQuestions extends Component{

    constructor(props){
        super(props);
        this.updateQuestionList = this.updateQuestionList.bind(this);
        this.state = {
            questionList :[],
            questionText:'',
            optionList:[],
            option:{
                optionText:'',
                tId:-1,
                optionRating:0
            }
        }
    }

    
    componentDidMount(){
        message.loading("loading options");
        const {tId = -1} = this.props || {};
        const optionsPromise = getOptionsOfTemplate(tId);
        optionsPromise.then(res => {
            res.json().then(data => {
                this.setState({
                    optionList:data
                });
            });
            message.destroy();
        });

        message.loading("loading questions");
        
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

    handleOptionInput(e){
        const rating = this.state.option.optionRating;
        this.setState({
            option:{
                optionText:e.target.value,
                optionRating:rating
            }
        });
    }

    handleRatingInput(e){
        const text = this.state.option.optionText;
        this.setState({
            option:{
                optionRating:e.target.value,
                optionText:text
            }
        });
    }

    handleClick(){
        const {tId = -1} = this.props || {};
        const text = this.state.option.optionText;
        const rating = this.state.option.optionRating;
        this.setState({
            option:{
               optionText:text,
               optionRating:rating,
            }
        });

        this.state.option.tId = tId;
        message.loading("Saving option");
        const saveOptionPromise = saveOption(this.state.option);
        saveOptionPromise.then(res => {
            if(res.ok){
                message.destroy();
                message.success("Option Saved");
                message.loading("loading options");
        const {tId = -1} = this.props || {};
        const optionsPromise = getOptionsOfTemplate(tId);
        optionsPromise.then(res => {
            res.json().then(data => {
                this.setState({
                    optionList:data
                });
            });
            message.destroy();
        });
            }
        });
        
    }

    deleteOption(id){
        message.loading("Deleting Option");
        const delOptionPromise = deleteOption(id);
        delOptionPromise.then(res => {
            if(res.ok){
                message.success("Option Deleted");
                message.destroy();
                message.loading("loading options");
                const { tId = -1 } = this.props || {};
                const optionsPromise = getOptionsOfTemplate(tId);
                optionsPromise.then(res => {
                    res.json().then(data => {
                        this.setState({
                            optionList: data
                        });
                    });
                    message.destroy();
        });
            }
        });
    }
    render(){
        const {readonly = true,tId = -1} = this.props || {}
        if(readonly){
            return <QuestionList readonly={true} QuestionList={this.state.questionList}/>
        }else{
            return <>
                <table className="table">
                    <tr><td><TextArea cols={50} onChange={this.handleInput.bind(this)} placeholder="New Question"></TextArea></td><td><Button icon="plus" onClick={this.saveQuestion.bind(this)}>Add</Button></td></tr>
                    <tr>
                       <td><Input type="text" placeholder="New Option" onChange={this.handleOptionInput.bind(this)}/></td><td><Input onChange={this.handleRatingInput.bind(this)} type="number" max="5" min="1" placeholder="Add Rating"/></td><td><Button icon="save" type="primary" onClick={this.handleClick.bind(this)}>Save</Button></td>
                    </tr>
                    <tr><td><List style={{display:'inline'}}>
                            {this.state.optionList.map(d => <><List.Item>{d.optionText}  <Badge count={d.optionRating} style={{backgroundColor:"orange"}}/> <Icon type="delete" onClick={()=>{this.deleteOption(d.id)}}/></List.Item></>)}
                        </List></td></tr>
                </table>
                <QuestionList readonly={false} QuestionList={this.state.questionList} updateState = {this.updateQuestionList}/>
            </>
        }
    }
}
 

export default AddQuestions;