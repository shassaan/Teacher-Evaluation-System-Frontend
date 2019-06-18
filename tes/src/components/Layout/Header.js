import React,{Component} from "react";
import {Container} from 'reactstrap';
import banner from './../../assets/banner.png';
class Header extends Component{
    render(){
        return(
            <div>
                <Container fluid={true}>
                    <Container fluid={false}><img style={{width:'inherit',height:'inherit'}} className="img img-responsive" src={banner}/></Container>
                </Container>
            </div>
        );
    }
}

export default Header;