import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
class Admin extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.auth){
            return <Redirect to="/AdminHome"/>
        }else{
            return <Redirect to="/AdminLogin"/>
        }
    }
   
}

export default Admin;