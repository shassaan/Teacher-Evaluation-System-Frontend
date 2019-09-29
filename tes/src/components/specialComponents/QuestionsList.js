import { List, Avatar, Icon, Radio, Button, message } from 'antd';
import React,{ Component } from 'react';
import {Redirect} from 'react-router-dom';
import { getTemplateOf } from '../../services/TemplateService';
import RadioGroup from 'antd/lib/radio/group';
import { postEvaluation } from '../../services/EvalService';


const result = [];
const data = {
  empNo:'',
  regNo:'',
  courseNo:'',
  discipline:'',
  semesterNo:'',
  questions:[]
};
  


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class QuestionsList extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
          redirect:false,
          questions:[],
          options:[],
        }
    }


    componentDidMount(){
      message.loading("Loading",100);
      const user = JSON.parse(window.localStorage.getItem("userData"));
      const templatePromise = getTemplateOf(user.data.regNo || user.data.empNo);
      templatePromise.then(res => {
        res.json().then(d => {
           this.setState({
             questions:d.questionAnswer,
             options:d.options.map(o => {
               return {label:o.optionText,value:o.optionRating}
             })
           });
           
        });
        message.destroy();
        message.info("Loaded");
      })
    }

    onChange(e){
     // this.setState({
       const text  =this.state.options.filter(s => s.value == e.target.value)[0].label;
        result[e.target.name]  = e.target.value+";"+text;
        
     // });
    }

    handleClick(){
      message.loading("loading..");
      const user = JSON.parse(window.localStorage.getItem("userData"));
      const emp = JSON.parse(window.localStorage.getItem("empInfo"));
          data["empNo"] = emp.p.a.empNo;
          data["regNo"]=user.data.regNo || user.data.empNo;
          data["courseNo"]=emp.p.a.courseNo;
          data["discipline"]=emp.p.a.discipline;
          data["semesterNo"]='2019SM';
          const arr = [];
          result.forEach((el,i)=>{
            arr.push({key:i,value:el});
          })
          data["questions"]=arr;
          console.log(arr);
          const evalPromise = postEvaluation(data);
          evalPromise.then(res => {
            if(res.ok){
              message.destroy();
              message.success("Evaluated");
             this.setState({redirect:true});
            }
          });
    }

    render(){
      if(this.state.redirect){
        return  <Redirect to={{
                pathname: '/'
                
            }}
          />
      }
        return (
        <div className="container">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: this.state.questions.length,
          }}
          dataSource={this.state.questions}
          renderItem={item => (
            <List.Item
              key={item.questionId}
            >
              <h5>Q : {item.question}</h5>{"\n"}{"\n"}
              <RadioGroup options={this.state.options} onChange={this.onChange} name={item.questionId}/>
            </List.Item>

          )}

         
        />
        <Button onClick={this.handleClick.bind(this)} type="primary">Submit</Button>
        </div>
        )
    }
}

export default QuestionsList;