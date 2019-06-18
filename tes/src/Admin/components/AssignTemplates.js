import React,{Component} from 'react';
import AssignTemplatesDropDowns from './AssignTemplatesDropDowns';
import AssignTemplatesTable from './AssignTemplatesTable';
import {getAssignedTemplates} from '../../services/AssignTemplatesService';
import {getTemplates} from '../../services/TemplateService';
class AssignTemplates extends Component{
    constructor(props){
        super(props);
        this.state = {
            assignedTemplates : [],
            templates:[]
        }

        this.updateState = this.updateState.bind(this);
    }

     componentDidMount(){
        const responsePromise = getAssignedTemplates();
        responsePromise.then(res => {
            res.json().then(data => {
                this.setState({
                    assignedTemplates:data
                });
            })
        });

        const responsePromiseTemplates = getTemplates();
        responsePromiseTemplates.then(r => {
            r.json().then(res => {
                this.setState({
                    templates:res
                });
            });
        })
        
    }

    updateState(updatedData){
        this.setState({
            assignedTemplates:updatedData
        });
    }

    render(){
        
        return <>
            <AssignTemplatesDropDowns data={this.state.templates} updateState={this.updateState}/>
            <AssignTemplatesTable data={this.state.assignedTemplates}/>
        </>
    }
}

export default AssignTemplates;