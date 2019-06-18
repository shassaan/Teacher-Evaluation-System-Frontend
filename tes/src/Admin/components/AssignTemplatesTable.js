import React,{Component} from 'react';
import {Table} from 'antd';
const columns = [{
    title: 'Name',
    dataIndex: 'assignTo',
    key: 'assignTo',
  }, {
    title: 'Template',
    dataIndex: 't',
    key: 'template',
    render:(text,record)=>(
        <p>{record.t.tName}</p>
    )
  }];


class AssignTemplatesTable extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        this.data =  this.props.data.map(d => {
            return {
                key: d.id,
                assignTo: d.assignTo,
                t:d.t
              }
        })
        return <><Table columns={columns} dataSource={this.data} />
        </>;
    }
}

export default AssignTemplatesTable;