import React, { Component } from "react";
import { Layout } from 'antd';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from 'react-router-dom/Route';
import {Redirect} from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from "./Layout/Header";
import MainPageContent from './specialComponents/MainPageContent';
import MainContent from "./Layout/MainContent";
import AdminMainContent from '../Admin/components/MainContent';
import User from "../User";
import Admin from '../admin';
import AdminLogin from '../Admin/AdminLogin';
import AdminHome from "../Admin/AdminHome";
import AdminLayout from '../Admin/Layout';
import Navigation from "../Admin/components/navigation";
const { Footer } = Layout;
class App extends Component {
    state = {
        userAuth: false,
        adminAuth: true
    }

    constructor(props) {
        super(props);
        this.updateUserAuth = this.updateUserAuth.bind(this);
        this.updateAdminAuth = this.updateAdminAuth.bind(this);
    }
    render() {
        return (
            <>
                <Router>
                    <Route path="/" exact strict component={() => {
                        return <User auth={this.state.userAuth} updateAuth={this.updateUserAuth} />
                    }} />
                    <Route path="/admin" exact strict component={() => {
                        return <Admin auth={this.state.adminAuth} updateAuth={this.updateAdminAuth} />
                    }} />

                    <Route path="/AdminLogin" exact strict component = {()=>{
                        if(this.state.adminAuth){
                            return <Redirect to="AdminHome"/>
                        }else{
                            return (
                                <AdminMainContent>
                                    <AdminLogin/>
                                </AdminMainContent>
                            );
                        }
                    }}/>


                    <Route path="/AdminHome" exact strict component = {()=>{
                        if(this.state.adminAuth){
                            return  (
                                <AdminLayout>
                                    <AdminHome/>
                                </AdminLayout>
                            );
                        }else{
                            return (
                                <>
                                <AdminMainContent>
                            <AdminLogin/>
                            </AdminMainContent>
                                </>
                            );
                        }
                    }}/>

                    
                </Router>
            </>
        );
    }

    updateUserAuth(auth) {
        this.setState({
            userAuth: auth
        });
    }

    updateAdminAuth(auth) {
        this.setState({
            adminAuth: auth
        });
    }
}

export default App;