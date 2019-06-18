import React, { Component } from 'react';
import avatar from './../../assets/avatar.png'
class StudentInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-4">
                        <img className="img img-rounded" src={avatar} alt=""/>
                    </div>
                    <div className="col-md-8">
                        <table className="table">
                            <tr>
                                <td><b>Name</b></td>
                                <td>Syed Hassaan Ahmed</td>
                            </tr>
                            <tr>
                                <td><b>Arid No.</b></td>
                                <td>2015-Arid-2398</td>
                            </tr>

                            <tr>
                                <td><b>Semester</b></td>
                                <td>Spring 2019</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentInfo;