import React, { Component } from "react";
import { Row, Col, Container } from 'reactstrap'
import logo from '../../assets/logo.png';
import LoginForm from '../specialComponents/login';

class MainPageContent extends Component {
    render() {
        return (

            <Container>
                <Row>

                    <Col md="4">
                        <img src={logo} alt="Hello" />
                    </Col>
                    <Col md="8">
                        <LoginForm />
                    </Col>
                </Row>
            </Container>



        );
    }
}



export default MainPageContent;