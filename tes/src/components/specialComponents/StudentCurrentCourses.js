import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Button, message,List } from 'antd';
import TeacherAvatar from './../../assets/TeacherAvatar.png';
import { getAlloc } from '../../services/AllocationService';
class StudentCurrentCourses extends Component{
    constructor(props){
        super(props);
        this.state = {
            coursesJsx :'',
            redirect:false,
            redirectJsx:''
        }
    }

    componentDidMount(){
        message.loading("Loading..",100);
        const user = JSON.parse(window.localStorage.getItem("userData"));
        const allocationCriteria = {
            disp:'',
            semester:'',
            section:'',
            SOS:''
        }
        if(user.type == "student"){
            allocationCriteria.disp = user.data.finalCourse;
            allocationCriteria.semester = user.data.semesterNo;
            allocationCriteria.section = user.data.section;
            allocationCriteria.SOS = user.data.sos;
            const allocPrommise  = getAlloc(allocationCriteria);
            allocPrommise.then(res => {
                res.json().then(data => {
                    const d = data.map(e => {
                        return <tr>
                                
                                    <td><img src={TeacherAvatar} className="roundecircle" style={{ width: '50px', height: '50px' }} />{e.p.e.empFirstname +" "+ e.p.e.empLastname}</td>
                                
                                
                                   <td>{e.c.courseDesc}</td>
                                

                               
                                   <td><Button type="default" onClick={()=>{this.handelClick(e)}}><b>Evaluate</b></Button></td>                        
                                   </tr>
                        
                        
                    })


                        this.setState({
                            coursesJsx:d
                        });
                        message.destroy();
                        message.info("Loaded");
                });
            });

        }
        else if(user.type == "teacher")
        {
            allocationCriteria.disp = "Teacher";
            const allocPrommise  = getAlloc(allocationCriteria);
            allocPrommise.then(res => {
                res.json().then(data => {
                    const d = data.map(e => {
                        return <tr>
                        <td><img src={TeacherAvatar} className="roundecircle" style={{ width: '50px', height: '50px' }} />{e.p.e.empFirstname +" "+ e.p.e.empLastname}</td>
                        <td>{e.c.courseDesc}</td>
                        <td>{e.c.discipline}</td>
                        <td>{e.p.a.section}</td>
                        <td><Button type="default" onClick={()=>{this.handelClick(e)}}><b>Evaluate</b></Button></td>
                    </tr>
                    })


                        this.setState({
                            coursesJsx:d
                        });
                        message.destroy();
                        message.info("Loaded");
                });
            });
        }
    }

    handelClick(emp){
        window.localStorage.setItem("empInfo",JSON.stringify(emp));
        this.setState({
            redirect:true,
            redirectJsx: <Redirect to={{
                pathname: '/Evaluation'
                
            }}
          />
        });
    }

    render(){

        if(this.state.redirect){
            return <>{this.state.redirectJsx}</>
        }
        return(
            <table className="table">
                {this.state.coursesJsx}
            </table>
            
        );
    }
}

export default StudentCurrentCourses;