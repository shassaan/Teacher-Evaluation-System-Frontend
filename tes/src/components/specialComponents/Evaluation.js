import React,{Component} from 'react';
import TeacherInfo from './TeacherInfo';
import QuestionsList from './QuestionsList';
class Evaluation extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="Container">
            <TeacherInfo/>
            <QuestionsList/>
            </div>
        )
    }
}

export default Evaluation;