import React, { Component } from "react";
import { Layout } from 'antd';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from 'react-router-dom/Route';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from "./Layout/Header";
import MainPageContent from './specialComponents/MainPageContent';
import MainContent from "./Layout/MainContent";
import AdminMainContent from '../Admin/components/MainContent';
import User from "../User";
import AdminLogin from '../Admin/AdminLogin';
import AdminLayout from '../Admin/Layout';
import Navigation from "../Admin/components/navigation";
import CreateTemplates from "../Admin/components/CreateTemplates";
import LoginForm from "./specialComponents/login";
const { Footer } = Layout;
class App extends Component {
    state = {
        userAuth: false,
        adminAuth: false
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
                        if (this.state.userAuth) {
                            return <h1>User Home</h1>
                        } else {
                            return <Redirect to="/UserLogin" />
                        }
                    }} />
                    <Route path="/admin" exact strict component={() => {
                        if (this.state.adminAuth) {
                            return <Redirect to="/AdminHome" />
                        } else {
                            return <Redirect to="/AdminLogin" />
                        }
                    }} />

                    <Route path="/AdminLogin" exact strict component={() => {
                        if (this.state.adminAuth) {
                            return <Redirect to="/AdminHome" />
                        } else {
                            return (
                                <AdminMainContent>
                                    <AdminLogin updateAuth={this.updateAdminAuth} />
                                </AdminMainContent>
                            );
                        }
                    }} />


                    <Route path="/AdminHome" exact strict component={() => {
                        if (this.state.adminAuth) {
                            return (
                                <AdminLayout>
                                    <AdminMainContent>
                                        <h1>Hello</h1>
                                    </AdminMainContent>
                                </AdminLayout>
                            );
                        } else {
                            return (
                                <>
                                    <AdminMainContent>
                                        <AdminLogin updateAuth={this.updateAdminAuth} />
                                    </AdminMainContent>
                                </>
                            );
                        }
                    }} />


                    <Route path="/CreateTemplates" exact strict component={() => {
                        if (this.state.adminAuth) {
                            return (
                                <AdminLayout>
                                    <AdminMainContent>
                                        <CreateTemplates />
                                    </AdminMainContent>
                                </AdminLayout>
                            );
                        } else {
                            return (
                                <>
                                    <AdminMainContent>
                                        <AdminLogin updateAuth={this.updateAdminAuth} />
                                    </AdminMainContent>
                                </>
                            );
                        }
                    }} />


                    <Route path="/dummy" exact strict component={() => {
                        if (this.state.adminAuth) {
                            return (
                                <AdminLayout>
                                    <AdminMainContent>
                                        <h1>dummy</h1>
                                    </AdminMainContent>
                                </AdminLayout>
                            );
                        } else {
                            return (
                                <>
                                    <AdminMainContent>
                                        <AdminLogin updateAuth={this.updateAdminAuth} />
                                    </AdminMainContent>
                                </>
                            );
                        }
                    }} />






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