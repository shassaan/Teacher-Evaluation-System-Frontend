import React,{Component} from 'react';
import TeacherAvatar from './../../assets/TeacherAvatar.png';
import {Link} from 'react-router-dom';
class TeacherInfo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const emp = JSON.parse(window.localStorage.getItem("empInfo"));
        return(
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-4">
                    <h5><Link style={{textDecoration:'none',color:'blue',text:'underline'}} to="/">{"<"}Back</Link></h5>
                        <img className="img img-circle" style={{width:'150px'}} src={TeacherAvatar} alt=""/>
                    </div>
                    <div className="col-md-8">
                      
                        <table className="table">
                            <tr>
                                <td><b>Teacher Name</b></td>
                                <td>{emp.p.e.empFirstname+" "+emp.p.e.empLastname}</td>
                            </tr>
                            <tr>
                                <td><b>Course</b></td>
                                <td>{emp.c.courseDesc}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherInfo;