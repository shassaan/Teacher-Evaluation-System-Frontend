import React, { Component } from 'react';
import avatar from './../../assets/avatar.jpg'
import { Button } from 'antd';
class StudentInfo extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        const user = JSON.parse(window.localStorage.getItem("userData"));
        if(user.type == "teacher"){
            return (
                <div className="jumbotron">
                <div className="row">
                    <div className="col-md-4">
                        <img className="img img-circle" style={{width:'150px'}} src={avatar} alt=""/>
                    </div>
                    <div className="col-md-8">
                        <table className="table">
                            <tr>
                                <td><b>Name</b></td>
                                <td>{user.data.empFirstname +" "+user.data.empLastname}</td>
                                <td> <Button type="dashed" onClick={()=>{this.props.updateAuth(false,null)}}>Logout</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            );
        }else if(user.type == "student"){
            
            return (
                <>
                
                <div className="jumbotron">
                <div className="row">
                    <div className="col-md-4">
                        <img className="img img-circle" style={{width:'150px'}} src={avatar} alt=""/>
                    </div>
                    <div className="col-md-8">
                        <table className="table">
                            <tr>
                                <td><b>Name</b></td>
                                <td>{user.data.stFirstname +" "+user.data.stMiddlename+" "+user.data.stLastname}</td>
                                 <td><Button type="dashed" onClick={()=>{
                    this.props.updateAuth(false,null);
                }
                
                }>Logout</Button></td> 
                            </tr>
                            <tr>
                                <td><b>Arid No.</b></td>
                                <td>{user.data.regNo}</td>
                            </tr>
                            <tr>
                                <td><b>Discipline</b></td>
                                <td>{user.data.finalCourse}</td>
                            </tr>
                            <tr>
                                <td><b>Semester</b></td>
                                <td>Spring 2019</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
                </>
            )
        }

        
    }
}

export default StudentInfo;