import React, { Component } from 'react';
import { Button,Select } from 'antd';
const {Option} = Select;
class Report extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            selects:{
                teacher:'',
                course:'',
                disp:'',
                sem:''
            },
            barchart:[]
        }
    }

    handleChangeTeacher(e){
        alert(e);
    }

    handleChangeCourse(e){
        alert(e);
    }
    handleChangeSem(e){
        alert(e);
    }

    handleChangeDisp(e){
        alert(e);
    }

    render() {
        return (
            <>
                <h2>Reports</h2>
                <table className="table">
                    <tr>
                        <td>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select Teacher"
                                optionFilterProp="children"
                                onChange={this.handleChangeTeacher.bind(this)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </td>
                        <td>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select Course"
                                optionFilterProp="children"
                                onChange={this.handleChangeCourse.bind(this)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select Semester"
                                optionFilterProp="children"
                                onChange={this.handleChangeSem.bind(this)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </td>
                        <td>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select Discipline"
                                onChange={this.handleChangeDisp.bind(this)}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </td>
                    </tr>
                </table>
                <Button icon="filter" type="primary">Filter</Button>
            </>

        );
    }
}

export default Report;