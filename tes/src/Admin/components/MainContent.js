import React,{ Component } from "react";
import {Container} from 'reactstrap';
class AdminMainContent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            
               
               
                 <>{this.props.children}</>
               
            
        );
    }
}

export default AdminMainContent;