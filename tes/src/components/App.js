import React, { Component } from "react";
import { Layout } from 'antd';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from 'react-router-dom/Route';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from "./Layout/Header";
import MainContent from "./Layout/MainContent";
import AdminMainContent from '../Admin/components/MainContent';
import AdminLogin from '../Admin/AdminLogin';
import AdminLayout from '../Admin/Layout';
import Navigation from "../Admin/components/navigation";
import CreateTemplates from "../Admin/components/CreateTemplates";
import LoginForm from "./specialComponents/login";
import MyFooter from "./Layout/Footer";
import Reports from '../Admin/components/Reports';
import AssignTemplates from "../Admin/components/AssignTemplates";
import UserLayout from "./Layout/Layout";
import StudentInfo from "./specialComponents/StudentInfo";
import StudentCurrentCourses from "./specialComponents/StudentCurrentCourses";
import Evaluation from "./specialComponents/Evaluation";
import CreateGroups from "../Admin/components/CreateGroups";
import InitEval from "../Admin/components/InitEval";
import DashBoardContent from "../Admin/components/Task";
const { Footer } = Layout;
class App extends Component {
    state = {
        userAuth: window.localStorage.getItem("userAuth") === null ? false:window.localStorage.getItem("userAuth"),
        adminAuth: window.localStorage.getItem("adminAuth") === null ? false:window.localStorage.getItem("adminAuth"),
        userData: window.localStorage.getItem("userData") === null ? {} :window.localStorage.getItem("userData")
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
                <Route path="/Evaluation" exact strict component={() => {
                        if (this.state.userAuth == "true") {
                            return (
                                <UserLayout>
                                   <Evaluation/>
                                </UserLayout>
                            )
                        } else {
                            return <Redirect to="/UserLogin" />
                        }
                    }} />


                    <Route path="/" exact strict component={() => {
                        if (this.state.userAuth == "true") {
                            return (
                                <UserLayout>
                                   <StudentInfo user={this.state.userData} updateAuth={this.updateUserAuth}/>
                                   <StudentCurrentCourses user={this.state.userData}/>
                                </UserLayout>
                            )
                        } else {
                            return <Redirect to="/UserLogin" />
                        }
                    }} />
                    <Route path="/admin" exact strict component={() => {
                        if (this.state.adminAuth == "true") {
                            return <Redirect to="/AdminHome" />
                        } else {
                            return <Redirect to="/AdminLogin" />
                        }
                    }} />

                    <Route path="/AdminLogin" exact strict component={() => {
                        if (this.state.adminAuth == "true") {
                            return <Redirect to="/AdminHome" />
                        } else {
                            return (
                                <AdminMainContent>
                                    <AdminLogin updateAuth={this.updateAdminAuth} />
                                </AdminMainContent>
                            );
                        }
                    }} />

                    <Route path="/UserLogin" exact strict component={() => {
                        if (this.state.userAuth == "true") {
                            return <Redirect to="/" />
                        } else {
                            return (
                                <UserLayout>
                                    <LoginForm updateUserAuth={this.updateUserAuth}/>
                                </UserLayout>
                            );
                        }
                    }} />


                    <Route path="/AdminHome" exact strict component={() => {
                        if (this.state.adminAuth == "true") {
                            return (
                                <AdminLayout>
                                    <AdminMainContent>
                                       <DashBoardContent/>
                                    </AdminMainContent>
                                </AdminLayout>
                            );
                        } else {
                            return (
                                <>
                                    <AdminMainContent>
                                        <AdminLogin updateAuth={this.updateAdminAuth} />
                                        <MyFooter/>
                                    </AdminMainContent>
                                </>
                            );
                        }
                    }} />


                    <Route path="/Adminlogout" exact strict component={() => {
                        this.updateAdminAuth(false);

                        return (<Redirect to="/admin"/>);
                        
                    }} />

                    <Route path="/CreateTemplates" exact strict component={() => {
                        if (this.state.adminAuth == "true") {
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


                    <Route path="/CreateGroups" exact strict component={() => {
                        if (this.state.adminAuth == "true") {
                            return (
                                <AdminLayout>
                                    <AdminMainContent>
                                        <CreateGroups/>
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

                    <Route path="/AssignTemplates" exact strict component={() => {
                        if (this.state.adminAuth == "true") {
                            return (
                                <AdminLayout>
                                    <AdminMainContent>
                                        <AssignTemplates/>
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


                    <Route path="/InitEval" exact strict component={() => {
                        if (this.state.adminAuth == "true") {
                            return (
                                <AdminLayout>
                                    <AdminMainContent>
                                        <InitEval/>
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

                    <Route path="/Reports" exact strict component={() => {
                        if (this.state.adminAuth == "true") {
                            return (
                                <AdminLayout>
                                    <AdminMainContent>
                                        <Reports/>
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

    updateUserAuth(auth,userData) {
        window.localStorage.setItem("userAuth",auth);
        window.localStorage.setItem("userData",JSON.stringify(userData));
        this.setState({
            userAuth: window.localStorage.getItem("userAuth"),
            userData:JSON.parse(window.localStorage.getItem("userData"))
        });
    }

    updateAdminAuth(auth) {
        window.localStorage.setItem("adminAuth",auth);
        this.setState({
            adminAuth: window.localStorage.getItem("adminAuth")
        });
    }
}

export default App;