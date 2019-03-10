import React, { Component } from "react";
import {Layout} from 'antd';
import Header from "./Layout/Header";
import MainPageContent from './specialComponents/MainPageContent';
import MainContent from "./Layout/MainContent";
const {Footer} = Layout; 
class App extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="container">
                    <MainContent>
                        <MainPageContent/>
                    </MainContent>
                </div>
                <Footer style={{textAlign:'center'}}>BIIT ©2018 Created By Syed Hassaan Ahmed.</Footer>
            </>
        );
    }
}

export default App;