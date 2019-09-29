import React, { Component } from "react";
import { Tabs, Card, message,Select } from 'antd';
import { getAllSemesters } from '../../services/SemesterService';
import RadioGroup from 'antd/lib/radio/group';
import TeacherAvatar from './../../assets/TeacherAvatar.png';
import { getBestTeacher,getPoorTeacher, worstTeacherWithTiming } from "../../services/ReportService";
const { TabPane } = Tabs;
const {Option} = Select;
const optionsForBestTeacher = [{ "label": "Question no. 1", "value": '1' }, { "label": "Question no. 15", "value": '15' }]
class DashBoardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bestTeacher: {},
            bestTeacherJsx: '',
            poorTeacher: {},
            poorTeacherJsx: '',
            worstTeacherTiming: {},
            worstTeacherTimingJsx: '',
            semesterJsx:'',
            sem:''
        }
    }

    

    componentDidMount(){
        const SemesterPromise = getAllSemesters();
        var semJsx  = null;
        SemesterPromise.then(res => {
            if(res.ok){
                res.json().then(d => {
                    semJsx = d.map(e => {
                        let x = e.semesterNo[5];
                        return <Option value={e.semesterNo}>{e.semesterDesc+' '+x}</Option>
                    });
                    this.setState({
                        semesterJsx:semJsx
                    });
                })

                
            }   
        });
    }

    handleChangeSem(e){
        this.setState({
            sem:e
        });
        
    }

    handleBestTeacher(e) {
        if(this.state.sem != ''){
            if(this.state.sem == '2018SM'){
                const question = e.target.value;
        message.loading("Geting Data", 100);
        console.log(question);
        const bestTeacherPromise = getBestTeacher(question);
        bestTeacherPromise.then(res => {
            res.json().then(data => {
                const jsx = <Card title={"Best Teacher"} bordered={true} type="inner">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={TeacherAvatar} className="roundecircle" style={{ width: '150px', height: '150px' }} />
                        </div>
                        <div className="col-md-8">
                            <table className="table">
                                <tr>
                                    <td><p><b>Name</b></p></td>
                                    <td><p>{data.empFirstname + ' '+data.empMiddle+' '+ data.empLastname}</p></td>
                                </tr>
                                <tr>
                                    <td><p><b>Status</b></p></td>
                                    <td><p>{data.status}</p></td>
                                </tr>
                                <tr>
                                    <td><p><b>Rating</b></p></td>
                                    <td><p>{"GOOD"}</p></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Card>;
                this.setState({
                    bestTeacherJsx: jsx
                });
                message.destroy();
                message.success("Data Loaded");
                //console.log(bestTeacherJsx);
            })
        });
            }
        }else{
            message.error("Please Select semester");
        }
    }


    handleWorstTeacher(e){
        if(this.state.sem != ''){
            if(this.state.sem == '2018SM'){
                if(e == 3){
                    message.loading("Getting Data",100);
                    const worstTeacherPromise = worstTeacherWithTiming();
                    worstTeacherPromise.then(res => {
                        res.json().then(data => {
                            const jsx = <Card title={"Worst Teacher with Regularity"} bordered={true} type="inner">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={TeacherAvatar} className="roundecircle" style={{ width: '150px', height: '150px' }} />
                                </div>
                                <div className="col-md-8">
                                    <table className="table">
                                        <tr>
                                            <td><p><b>Name</b></p></td>
                                            <td><p>{data.empFirstname + ' ' + data.empLastname}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p><b>Status</b></p></td>
                                            <td><p>{"PERMANENT"}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p><b>Rating</b></p></td>
                                            <td><p>{"AVERAGE"}</p></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </Card>;
                        this.setState({
                            worstTeacherTimingJsx: jsx
                        });
                        message.destroy();
                        message.success("Data Loaded");
                        })
                    });
                }
            }
    
        }else{
            message.error("Please select semester first");
        }
    
    }



    handlePoorTeacher(e) {
        if(this.state.sem != ''){
            if(this.state.sem == '2018SM'){
                const question = e.target.value;
        message.loading("Geting Data", 100);
        console.log(question);
        const poorTeacherPromise = getPoorTeacher(question);
        poorTeacherPromise.then(res => {
            res.json().then(data => {
                const jsx = <Card title={"Poor Teacher"} bordered={true} type="inner">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={TeacherAvatar} className="roundecircle" style={{ width: '150px', height: '150px' }} />
                        </div>
                        <div className="col-md-8">
                            <table className="table">
                                <tr>
                                    <td><p><b>Name</b></p></td>
                                    <td><p>{data.empFirstname + ' ' + data.empLastname}</p></td>
                                </tr>
                                <tr>
                                    <td><p><b>Status</b></p></td>
                                    <td><p>{"PERMANENT"}</p></td>
                                </tr>
                                <tr>
                                    <td><p><b>Rating</b></p></td>
                                    <td><p>{"AVERAGE"}</p></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Card>;
                this.setState({
                    poorTeacherJsx: jsx
                });
                message.destroy();
                message.success("Data Loaded");
                //console.log(bestTeacherJsx);
            })
        });    
            }
        }else{
            message.error("Please select semester first");
        }
    }

    render() {
        return (
            <div className="container">
                <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="Select Semester"
                    optionFilterProp="children"
                    onChange={this.handleChangeSem.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.state.semesterJsx}
                </Select>
                <Tabs defaultActiveKey="1" onChange={this.handleWorstTeacher.bind(this)}>
                    <TabPane tab="Best Teacher" key="1">
                        <div className="container">
                            <div className="row">
                                <h6>Best Teacher For : </h6>
                                <RadioGroup options={optionsForBestTeacher} onChange={this.handleBestTeacher.bind(this)} />
                              </div>
                            <div className="row">
                                {this.state.bestTeacherJsx}
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="Poor Teacher" key="2">
                        <div className="container">
                            <div className="row">
                            <h6>Poor Teacher For : </h6>
                                <RadioGroup options={optionsForBestTeacher} onChange={this.handlePoorTeacher.bind(this)} />
                            </div>
                            <div className="row">
                                {this.state.poorTeacherJsx}
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="Worst Teacher with Regularity" key="3">
                    <div className="container">
                            <div className="row">
                                {this.state.worstTeacherTimingJsx}
                            </div>
                        </div>
                    </TabPane>


                </Tabs>
            </div>
        );
    }
}

export default DashBoardContent;