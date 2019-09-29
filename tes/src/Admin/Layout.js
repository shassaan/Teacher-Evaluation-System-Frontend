import { Layout, Menu, Icon } from 'antd';
import AdminMainContent from './components/MainContent';
import MyFooter from '../components/Layout/Footer';
import React,{ Component } from 'react';
import {Link} from 'react-router-dom';
import {Container} from 'reactstrap';
const {
  Header, Content, Footer, Sider,
} = Layout;


class AdminLayout extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Layout>
    <Sider 
    breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => { console.log(broken); }}
      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      style={{
      height: '100vh'
    }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="vertical">
      <Menu.Item key="1" onClick={()=>{}}>
          <Icon type="home" style={{color:'brown'}}/>
          <span className="nav-text"><Link style={{textDecoration:'none',color:'white'}} to="/AdminHome">Home</Link></span>
        </Menu.Item>
        <Menu.Item key="2" onClick={()=>{}}>
          <Icon type="plus" style={{color:'voilet'}}/>
          <span className="nav-text"><Link style={{textDecoration:'none',color:'white'}} to="/CreateGroups">Create Groups</Link></span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="plus" style={{color:'green'}}/>
          <span className="nav-text"><Link style={{textDecoration:'none',color:'white'}} to="/CreateTemplates">Create Templates</Link></span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="reconciliation" style={{color:'red'}}/>
          <span className="nav-text"><Link style={{textDecoration:'none',color:'white'}} to="/InitEval">Initialize Evaluation</Link></span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="bar-chart" style={{color:'purple'}}/>
          <span className="nav-text"><Link style={{textDecoration:'none',color:'white'}} to="/Reports">Reports</Link></span>
        </Menu.Item>
        <Menu.Item key="6">
          <span className="nav-text"><Link style={{textDecoration:'none',color:'white'}} to="/AssignTemplates">📑 Assign templates</Link></span>
        </Menu.Item>
        <Menu.Item key="7" onClick={()=>{}}>
          <Icon type="logout" style={{color:'golden'}}/>
          <span className="nav-text"><Link style={{textDecoration:'none',color:'white'}} to="/Adminlogout">logout</Link></span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} ><Container><h1>Director's Dashboard</h1></Container></Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          <AdminMainContent>
              {this.props.children}
          </AdminMainContent>
        </div>
      </Content>
       <MyFooter/>
    </Layout>
  </Layout>
        );
    }
}

export default AdminLayout;