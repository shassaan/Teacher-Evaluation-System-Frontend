import React,{Component} from 'react';
import { Button,Select,DatePicker,List, message } from 'antd';
import { getGroups } from '../../services/GroupService';
import { getAllCustomEvaluations, postCustomEvaluation, endCustomEvaluation } from '../../services/CustomEvaluationService';
const {Option} = Select;
class InitEval extends Component{
    constructor(props){
        super(props);
        this.state = {
            groupOptions:'',
            customEvaluations:[],
            selects:{
                gid:'',
                endDate:''
            }
        }
    }

    handleChangeGroup(e){
        this.setState({
            selects:{
                gid:e,
                endDate:this.state.selects.endDate
            }
            
        });
    }

    handleDatePick(date,dateString){
        this.setState({
            selects:{
                gid:this.state.selects.gid,
                endDate:dateString
            }
            
        });
    }

    handleClickInit(){
        message.loading("Initializing");
        const postEvalPromise = postCustomEvaluation(this.state.selects);
        postEvalPromise.then(res => {
            res.json().then(data => {
                this.setState({
                    customEvaluations:data
                });

                message.destroy();
                message.success("Initialized");
            })
        })
    }

    componentDidMount(){
        const groupsPromise = getGroups();
        groupsPromise.then(res => {
            res.json().then(data => {
                this.setState({
                    groupOptions:data.map(op => {
                        return <Option value={op.gId}>{op.gName}</Option>
                    })
                });
            });
        });


        const evalPromsise = getAllCustomEvaluations();
        evalPromsise.then(res => {
            res.json().then(data => {
                this.setState({
                    customEvaluations:data
                });
            })
        })
    }

    endEvaluation(id){
        message.loading("Ending");
        const delPromise = endCustomEvaluation(id);
        delPromise.then(res => {
            res.json().then(data => {
                this.setState({
                    customEvaluations:data
                });
                message.destroy();
                message.success("Ended");
            })
        })
    }

    render(){
        return (
            <>
                <h2>Initialize Evaluation</h2>
                <table className="table">
                    <tr>
                        <td>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a Group"
                                optionFilterProp="children"
                                onChange={this.handleChangeGroup.bind(this)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.groupOptions}
                            </Select>
                        </td>

                        <td>
                            <DatePicker placeholder="End Date" onChange={this.handleDatePick.bind(this)}/>
                        </td>

                        <td>
                            <Button onClick={this.handleClickInit.bind(this)} icon="caret-right" type="primary">Start Evaluation</Button>
                        </td>
                    </tr>
                </table>
                <List
                        itemLayout="vertical"
                        dataSource={this.state.customEvaluations}
                        pagination={{
                            pageSize: 6,
                        }}
                        renderItem={item => (
                            <List.Item actions={[<Button icon="pause" type="danger" onClick={() => {this.endEvaluation(item.id)}}>End Evaluation</Button>]}>
                                <table className="table">
                                    <tr>
                                        <td><h6>{item.g.gName}</h6></td>
                                        <td><h6>{new Date(item.endDate).toDateString()}</h6></td>
                                    </tr>
                                </table>
                            </List.Item>
                        )}
                    />
            </>
        );
    }
}

export default InitEval;