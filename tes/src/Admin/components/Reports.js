import React, { Component } from 'react';
import { Button,Select, message,Modal } from 'antd';
import SimpleChart from './chart';
import {Chart} from 'react-google-charts';
import { getAllTeachers } from '../../services/TeacherService';
import { getAllCourses } from '../../services/CourseService';
import { getAllSemesters } from '../../services/SemesterService';
import { simpleBarChartData, groupedBarChartTeacherData,groupedBarChartCourseData } from '../../services/ReportService';
import { getUnique } from '../../services/globalFunctions';
import {Tabs} from 'antd';
import { getTemplates } from '../../services/TemplateService';
import { getOptionsOfTemplate } from '../../services/optionService';
import { getQuestionsOfTemplate } from '../../services/QuestionService';
const {TabPane} = Tabs;
const {Option} = Select;
class Report extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            optionsJsx:'',
            teacherJsx:null,
            courseJsx:null,
            semesterJsx:null,
            templateJsx:null,
            modalVisibilty:false,
            questionsJsx:null,
            selects:{
                teacher:'',
                course:'',
                disp:'',
                sem:'',
                tid:''
            },
            simplebBarChart:[{values:[{x:'',y:0}]},],
            //[{label:'',values:[{x:'',y:0}]},]
            groupedBarChartTeacher:[["",""]],
            groupedBarChartCourse:[["",""]],
           
        }
    }

    handleChangeTeacher(e){
        this.setState({
            selects:{
                teacher:e,
                course:this.state.selects.course,
                disp:this.state.selects.disp,
                sem:this.state.selects.sem,
                tid:this.state.selects.tid
            }
        });
    }

    handleChangeCourse(e){
        this.setState({
            selects:{
                teacher:this.state.selects.teacher,
                course:e,
                disp:this.state.selects.disp,
                sem:this.state.selects.sem,
                tid:this.state.selects.tid
            }
        });
    }
    handleChangeSem(e){
        this.setState({
            selects:{
                teacher:this.state.selects.teacher,
                course:this.state.selects.course,
                disp:this.state.selects.disp,
                sem:e,
                tid:this.state.selects.tid

            }
        });
    }

    handleChangeDisp(e){
        this.setState({
            selects:{
                teacher:this.state.selects.teacher,
                course:this.state.selects.course,
                disp:e,
                sem:this.state.selects.sem,
                tid:this.state.selects.tid

            }
        });
    }

    handleChangeTemplate(e){
        this.setState({
            selects:{
                teacher:this.state.selects.teacher,
                course:this.state.selects.course,
                disp:this.state.selects.disp,
                sem:this.state.selects.sem,
                tid:e

            }
        });
    }
    componentWillMount(){
        const teachersPromise = getAllTeachers();
        var teacherJsx1  = null;
        teachersPromise.then(res => {
            if(res.ok){
                res.json().then(d => {
                    teacherJsx1 = d.map(e => {
                        return <Option value={e.empNo}>{e.empFirstname + ' ' +e.empLastname}</Option>
                    });
                    this.setState({
                        teacherJsx:teacherJsx1
                    });
                })

                
            }   
        });

        const CoursePromise = getAllCourses();
        var courseJsx1  = null;
        CoursePromise.then(res => {
            if(res.ok){
                res.json().then(d => {
                    const uniqueData = getUnique(d,'courseNo');
                    courseJsx1 = uniqueData.map(e => {
                        return <Option value={e.courseNo}>{e.courseDesc +" "+ e.courseNo}</Option>
                    });


                    this.setState({
                        courseJsx:courseJsx1
                    });
                })

                
            }   
        });

        const SemesterPromise = getAllSemesters();
        var semJsx  = null;
        SemesterPromise.then(res => {
            if(res.ok){
                res.json().then(d => {
                    semJsx = d.map(e => {
                        return <Option value={e.semesterNo}>{e.semesterDesc}</Option>
                    });
                    this.setState({
                        semesterJsx:semJsx
                    });
                })

                
            }   
        });

        const templatePromise = getTemplates();
        var templateJsx  = null;
        templatePromise.then(res => {
            if(res.ok){
                res.json().then(d => {
                    templateJsx = d.map(e => {
                        return <Option value={e.id}>{e.tName}</Option>
                    });
                    this.setState({
                        templateJsx:templateJsx
                    });
                })
            }   
        });
    }


    handleFilterClick(){
        message.loading("Creating...");
        const optionsPromise = getOptionsOfTemplate(this.state.selects.tid);
        optionsPromise.then(res => {
            if(res.ok){
                res.json().then(op => {
                    this.setState({
                        optionsJsx:op.map(e => {
                            return <tr><td>{e.optionRating}</td><td>{e.optionText}</td></tr>
                        })
                    });
                })
            }
        });
        const chartPromise = simpleBarChartData(this.state.selects);
        chartPromise.then(res => {
            if(res.ok)
            {
                res.json().then(d => {
                    this.setState({
                        simplebBarChart:d
                    });
                    message.destroy();
                })
            }
        });
    }

    handleFilterClickTeacher(){
        message.loading("Creating...");
        const key = this.state.selects.disp+this.state.selects.sem+this.state.selects.teacher+this.state.selects.tid;
        if(window.localStorage.getItem(key) != null){
            const data = JSON.parse(window.localStorage.getItem(key));
            this.setState({
                groupedBarChartTeacher:data
            });
            message.destroy();
        }else{
            const chartPromise = groupedBarChartTeacherData(this.state.selects);
            chartPromise.then(res => {
                if (res.ok) {
                    res.json().then(d => {
                        window.localStorage.setItem(key,JSON.stringify(d));
                        this.setState({
                            groupedBarChartTeacher:d
                        });
                        message.destroy();
                    })
                }
            });
            message.destroy();
        }
        
    }

    handleClickCourse(){
        message.loading("Creating...");
        const key = this.state.selects.disp+this.state.selects.sem+this.state.selects.course+this.state.selects.tid;
        if(window.localStorage.getItem(key) != null){
            const data = JSON.parse(window.localStorage.getItem(key));
            this.setState({
                groupedBarChartCourse:data
            });
            message.destroy();
        }else{
            const chartPromise = groupedBarChartCourseData(this.state.selects);
            chartPromise.then(res => {
                if(res.ok)
                {
                    res.json().then(d => {
                        window.localStorage.setItem(key,JSON.stringify(d));
                        this.setState({
                            groupedBarChartCourse:d
                        });
                        message.destroy();
                    })
                }
            });
        }
       
    }

    handleFilterClickDetails(){
        message.loading("Loading");
        const questionPromise = getQuestionsOfTemplate(this.state.selects.tid);
        questionPromise.then(res => {
            res.json().then(d => {
                let i = 0;
                const jsx = d.map(q => {
                    return <tr><td>{++i}</td><td>{q.question}</td></tr>
                })
                this.setState({
                    questionsJsx:jsx,
                    modalVisibilty:true
                });
                message.destroy();
            })
        })

    }

    render() {
        return (
            <>
            <Modal
                    title={"Details"}
                    style = {{top:20}}
                    visible={this.state.modalVisibilty}
                    footer={false}
                    onCancel = {(e)=>{this.setState({modalVisibilty:false})}}
                >
                <table className="table">
                    <tr>
                        <td><b>Q no.</b></td>
                        <td><b>Question</b></td>
                    </tr>
                    {this.state.questionsJsx}
                </table>
                </Modal>
                <h2>Reports</h2>
                <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="Select Template"
                    optionFilterProp="children"
                    onChange={this.handleChangeTemplate.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.state.templateJsx}
                </Select><br/><br/>
                <Button icon="?" type="primary" onClick={this.handleFilterClickDetails.bind(this)}>Details</Button>
                <Tabs defaultActiveKey="1" onChange={()=>{}}>
                    <TabPane tab="Default Report" key="1">
                    <table className="table">
                    <tr>
                        <td>
                            <Select
                                showSearch
                                style={{ width: 300 }}
                                placeholder="Select Teacher"
                                optionFilterProp="children"
                                onChange={this.handleChangeTeacher.bind(this)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                
                                {this.state.teacherJsx}
                            </Select>
                        </td>
                        <td>
                            <Select
                                showSearch
                                style={{ width: 300 }}
                                placeholder="Select Course"
                                optionFilterProp="children"
                                onChange={this.handleChangeCourse.bind(this)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            {this.state.courseJsx}
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            <Select
                                showSearch
                                style={{ width: 300 }}
                                placeholder="Select Discipline"
                                onChange={this.handleChangeDisp.bind(this)}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="BCS">BCS</Option>
                                <Option value="MCS">MCS</Option>
                                <Option value="BIT">BIT</Option>
                                <Option value="MIT">MIT</Option>
                            </Select>
                        </td>
                    </tr>
                </table>
                <Button icon="filter" type="primary" onClick={this.handleFilterClick.bind(this)}>Generate Graph</Button>
                <div className="row">
                    <div className="col-md-10">
                       <SimpleChart data={this.state.simplebBarChart}/>
                    </div>
                    <div className="col-md-2">
                        <table className="table">{this.state.optionsJsx}</table>
                    </div>
                </div>
                    </TabPane>
                    <TabPane tab="Single Teacher Multiple Courses" key="2">
                        <table className="table">
                            <tr>
                                <td>
                                    <Select
                                        showSearch
                                        style={{ width: 300 }}
                                        placeholder="Select Teacher"
                                        optionFilterProp="children"
                                        onChange={this.handleChangeTeacher.bind(this)}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {this.state.teacherJsx}
                                    </Select>
                                </td>
                                <td>
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
                                </td>
                            </tr>
                        </table>
                         <Button icon="filter" type="primary" onClick={this.handleFilterClickTeacher.bind(this)}>Generate Graph</Button>                    
                        {/* <BarChart
                            groupedBars
                            data={this.state.groupedBarChart}
                            width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/> */}
                        <Chart
                            width={'1000px'}
                            height={'300px'}
                            style={{marginTop:'50px'}}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={this.state.groupedBarChartTeacher}
                            // For tests
                        />
                         </TabPane>
                    <TabPane tab="Single Course Multiple Teachers" key="3">
                    <table className="table">
                            <tr>
                                <td>
                                    <Select
                                        showSearch
                                        style={{ width: 300 }}
                                        placeholder="Select Course"
                                        optionFilterProp="children"
                                        onChange={this.handleChangeCourse.bind(this)}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {this.state.courseJsx}
                                    </Select>
                                </td>
                                <td>
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
                                </td>
                            </tr>
                        </table>
                         <Button icon="filter" type="primary" onClick={this.handleClickCourse.bind(this)}>Generate Graph</Button>
                         <Chart
                            width={'1000px'}
                            height={'300px'}
                            style={{marginTop:'50px'}}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={this.state.groupedBarChartCourse}
                            // For tests
                            
                        />
                    </TabPane>
                </Tabs>
                            </>

        );
    }
}

export default Report;