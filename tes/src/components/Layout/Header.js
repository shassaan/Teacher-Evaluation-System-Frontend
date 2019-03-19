import React,{Component} from "react";
import {Container} from 'reactstrap';
class Header extends Component{
    render(){
        return(
            <div>
                <Container fluid={true}>
                    <Container style={{background:'lightGreen',borderRadius:10}}><h1 style={{color:'darkGreen'}}>Teacher Evaluation System</h1></Container>
                </Container>
            </div>
        );
    }
}

export default Header;