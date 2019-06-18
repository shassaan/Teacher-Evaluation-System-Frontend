import React,{Component} from 'react';
import { Select, Button, message } from 'antd';
import {updateAssignedTemplates,getAssignedTemplates} from '../../services/AssignTemplatesService';
const {Option} = Select;
class AssignTemplatesDropDowns extends Component{
    constructor(props){
        super(props);
        this.state = {
            tid:-1,
            assignTo:''
        }

        this.handleChangeAssignTo = this.handleChangeAssignTo.bind(this);
        this.handleChangeTemplate = this.handleChangeTemplate.bind(this);
        this.saveAssignTo = this.saveAssignTo.bind(this);
    }


    handleChangeTemplate(value){
        this.setState({
            tid:value,
        });
    }

    handleChangeAssignTo(value){
        this.setState({
            assignTo:value,
        });
    }

    saveAssignTo(){
        message.loading("Assigning Templates");
        const saveAssignToPromise =  updateAssignedTemplates(this.state);
        saveAssignToPromise.then(res => {
            if(res.ok){
                message.destroy();
                message.success("Template Assigned");
                const promise = getAssignedTemplates();
                promise.then(p => {
                    p.json().then(data => {
                        this.props.updateState(data);
                    });
                });
            }
        });
    }

    render(){
        this.templateOptions = this.props.data.map(d => {
            return <option value={d.id}>{d.tName}</option>
        });
        return <>
            <table className="table">
                <tr>
                    <td><h6>Templates</h6></td>
                    <td>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a Template"
                            optionFilterProp="children"
                            onChange={this.handleChangeTemplate}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.templateOptions}
                        </Select>
                    </td>
                </tr>

                <tr>
                    <td><h6>Assign To</h6></td>
                    <td>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Discipline"
                            optionFilterProp="children"
                            onChange={this.handleChangeAssignTo}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="BCS">BCS</Option>
                            <Option value="MCS">MCS</Option>
                            <Option value="BSIT">BSIT</Option>
                            <Option value="MIT">MIT</Option>
                            <Option value="Teacher">Teacher</Option>
                        </Select>
                    </td>
                </tr>
                <tr>
                    <td><h1>                </h1></td>
                    <td><Button icon="check" type="primary" onClick={this.saveAssignTo}>Assign</Button></td>
                </tr>
            </table>
           
        </>
    }
}

export default AssignTemplatesDropDowns;