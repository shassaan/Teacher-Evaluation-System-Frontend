import React, { Component } from "react";
import { Layout } from 'antd';
import {Container} from 'reactstrap';
import Header from "./components/Layout/Header";
import MainPageContent from './components/specialComponents/MainPageContent';
import MainContent from "./components/Layout/MainContent";
import MyFooter from "./components/Layout/Footer";
const { Footer } = Layout;
class User extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <>
                <Header />
                <Container>
                    <MainContent>
                        <MainPageContent />
                    </MainContent>
                </Container>
                <MyFooter/>
            </>
        );
    }
}

export default User;