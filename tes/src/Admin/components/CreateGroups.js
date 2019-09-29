import React,{Component} from 'react';
import { Button,Modal,Input,Select, message,List,Slider,Checkbox, Badge} from 'antd';
import { getTemplates } from '../../services/TemplateService';
import { postGroup, getGroups, delGroup, populateStudentGroup, getStudentsOfGroup, delStudentOfGroup } from '../../services/GroupService';
const CheckboxGroup = Checkbox.Group;
const genderOptions = [
    {label:'Male',value:'M'},
    {label:'Female',value:'F'}
];
const DisciplineOptions = ['BCS','BIT','MCS','MIT'];
class CreateGroups extends Component{
    constructor(props){
        super(props);
        this.populateGroup = this.populateGroup.bind(this);
        this.state = {
            modalVisibilty:false,
            popualateGroupModalVisiblty:false,
            viewGroupModalVisiblty:false,
            templates:[],
            groups:[],
            currentGroup:{},
            students:[],
            group:{
                gName:'',
                tid:-1
            },
            groupCriteria:{
                age:[],
                enrollmentStatus:'',
                gender:[],
                discipline:[],
                gid:''
            }

        }
    }


    handleClick(){
        this.setState({
            modalVisibilty:true,
            group:{
                gName:'',
                tid:-1
            }
        });
    }

    handleCancel(){
        this.setState({
            modalVisibilty:false,
            group:{
                gName:'',
                tid:-1
            }
        });
    }

    deleteGroup(tid){
        const delGroupPromise = delGroup(tid);
        message.loading("deleting..");
        delGroupPromise.then(res => {
            if(res.ok){
                message.destroy();
                message.success("Deleted");
                const getGroupsPromise = getGroups();
                getGroupsPromise.then(res => {
                    if(res.ok){
                        res.json().then(data =>{
                            this.setState({
                                groups:data
                            });
                            
                        })
                    }
                });
            }
        });
    }

    

    postGroup(){
        const postGroupPromise = postGroup(this.state.group);
        message.loading("Creating Group");
        postGroupPromise.then(res =>{
            if(res.ok){
                message.destroy();
                message.success("Group Created");
                const getGroupsPromise = getGroups();
                getGroupsPromise.then(res => {
                    if(res.ok){
                        res.json().then(data =>{
                            this.setState({
                                groups:data
                            });
                        })
                    }
                });
            }
        });
    }

    handleInput(e){
        this.setState({
            group:{
                gName:e.target.value,
                tid:-1
            }
        });
    }

    componentDidMount(){
        const responsePromiseTemplates = getTemplates();
        responsePromiseTemplates.then(r => {
            r.json().then(res => {
                this.setState({
                    templates:res
                });
            });
        })

        const getGroupsPromise = getGroups();
        getGroupsPromise.then(res => {
            if(res.ok){
                res.json().then(data =>{
                    this.setState({
                        groups:data
                    });
                })
            }
        });


    }

    handleChangeTemplate(e){
        this.setState((prev,props)=>({
            group:{
                tid:e,
                gName:prev.group.gName
            }
        }));

        
    }

    handleCancelPopulate(){
        this.setState({
            popualateGroupModalVisiblty:false
        });
    }


    populateGroup(group){
        console.log(group);
        this.setState({
            popualateGroupModalVisiblty:true,
            currentGroup:group
        });
    }

    onChange(value){
        this.setState({
            groupCriteria:{
                age:value,
                enrollmentStatus:this.state.groupCriteria.enrollmentStatus,
                gender:this.state.groupCriteria.gender,
                discipline:this.state.groupCriteria.discipline,
                gid:this.state.currentGroup.gId
            }
        });
    }


    handleChangeEnrollStatus(e){
        this.setState({
            groupCriteria:{
                age:this.state.groupCriteria.age,
                enrollmentStatus:e,
                gender:this.state.groupCriteria.gender,
                discipline:this.state.groupCriteria.discipline,
                gid:this.state.currentGroup.gId
            }
        });
    }

    handleClickSave(){
        //console.log(this.state.groupCriteria);
        message.loading("Populating Group");
        const populateGroupPromise = populateStudentGroup(this.state.groupCriteria);
        populateGroupPromise.then(res => {
            if(res.ok){
                res.json().then(data => {
                    message.destroy();
                    message.success("Populated");
                })
            }
        }); 
    }

    checkBoxGender(checkedValues){
        this.setState({
            groupCriteria:{
                age:this.state.groupCriteria.age,
                enrollmentStatus:this.state.groupCriteria.enrollmentStatus,
                gender:checkedValues,
                discipline:this.state.groupCriteria.discipline,
                gid:this.state.currentGroup.gId
            }
        });
    }

    CheckboxDisp(checkedValues){
        this.setState({
            groupCriteria:{
                age:this.state.groupCriteria.age,
                enrollmentStatus:this.state.groupCriteria.enrollmentStatus,
                gender:this.state.groupCriteria.gender,
                discipline:checkedValues,
                gid:this.state.currentGroup.gId
            }
        });
    }

    viewStudents(gid){
        message.loading("loading");
        const getStdPromise = getStudentsOfGroup(gid);
        getStdPromise.then(res => {
            if(res.ok){
                res.json().then(data => {
                    
                    this.setState({
                        viewGroupModalVisiblty:true,
                        students:data
                    });

                    message.destroy();
                    message.success("Loaded");
                })
            }
        });
    }

    handleViewCancel(){
        this.setState({
            viewGroupModalVisiblty:false
        });
    }

    delStudent(gid,st){
        message.loading("Deleting");
        const stdDelPromise = delStudentOfGroup(gid,st);
        stdDelPromise.then(res => {
            res.json().then(data => {
                this.setState({
                    students:data
                })
                message.destroy();
                message.success("Deleted");
            })
        });
    }


    render(){
        this.templateOptions = this.state.templates.map(d => {
            return <option value={d.id}>{d.tName}</option>
        });
        
        return(
            <>
                <h1>Create Groups</h1>
                <Button icon="plus" type="primary" onClick={this.handleClick.bind(this)}>New</Button>
                <Modal
                    title="Create Groups"
                    visible={this.state.modalVisibilty}
                    onCancel={this.handleCancel.bind(this)}
                    footer={false}
                >
                   <table style={{width:'100%'}}><tr><td><Input type="text" placeholder="Group Name" onChange={this.handleInput.bind(this)}/></td>
                   <td><Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a Template"
                            optionFilterProp="children"
                            onChange={this.handleChangeTemplate.bind(this)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.templateOptions}
                        </Select></td>
                   <td><Button type="primary" onClick={this.postGroup.bind(this)}>Create</Button></td></tr></table>
                </Modal>
                {/**/}
                <Modal
                    title="Populate Group"
                    visible={this.state.popualateGroupModalVisiblty}
                    onCancel={this.handleCancelPopulate.bind(this)}
                    footer={false}
                >
                   <div className="container">
                        <table className="table">
                            <tr>
                            <b>Enrollment Status</b>
                                <td>
                                    
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Enrollment Status"
                                        optionFilterProp="children"
                                        onChange={this.handleChangeEnrollStatus.bind(this)}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <option value="COMPLETED">COMPLETED</option>
                                        <option value="ENROLLED">ENROLLED</option>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <b>Age Group</b>
                                   <td><Slider range defaultValue={[20, 50]} onChange={this.onChange.bind(this)}/></td>
                            </tr>
                            <tr>
                                <b>Gender</b>
                                <td><CheckboxGroup onChange={this.checkBoxGender.bind(this)} options={genderOptions}/></td>
                            </tr>
                            <tr>
                                <b>Discipline</b>
                                <td><CheckboxGroup onChange={this.CheckboxDisp.bind(this)} options={DisciplineOptions}/></td>
                            </tr>
                            <tr>
                                <td><Button type="primary" onClick={this.handleClickSave.bind(this)}>Save</Button></td>
                            </tr>
                        </table>
                   </div>
                </Modal>
                <List
                    itemLayout="vertical"
                    dataSource={this.state.groups}
                    renderItem={item => (
                        <List.Item actions={[<Button type="dashed" onClick={()=>{this.populateGroup(item)}}>Populate</Button>,<Button icon="delete" onClick={()=>{this.deleteGroup(item.gId)}}>Delete</Button>,<Button icon="eye" onClick={()=>{this.viewStudents(item.gId)}}>View</Button>]}>
                            <h6>{item.gName}</h6>
                        </List.Item>
                    )}
                />

                <Modal
                    title="Students"
                    visible={this.state.viewGroupModalVisiblty}
                    onCancel={this.handleViewCancel.bind(this)}
                    footer={false}
                >
                    <List
                        itemLayout="vertical"
                        dataSource={this.state.students}
                        pagination={{
                            pageSize: 6,
                        }}
                        renderItem={item => (
                            <List.Item actions={[<Button icon="delete" type="danger" onClick={() => {this.delStudent(item.gid,item.st)}}>Remove</Button>]}>
                                <h6>{item.st.stFirstname} {item.st.stMiddlename} {item.st.stLastname}</h6>
                            </List.Item>
                        )}
                    />
                </Modal>
            </>
        );
    }
}

export default CreateGroups;