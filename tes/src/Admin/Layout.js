
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
    <Sider style={{
      overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
    }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Icon type="plus" style={{color:'green'}}/>
          <span className="nav-text"><Link style={{textDecoration:'none',color:'white'}} to="/CreateTemplates">Create Templates</Link></span>
        </Menu.Item>
        
        <Menu.Item key="2">
          <Icon type="reconciliation" style={{color:'red'}}/>
          <span className="nav-text">Initialize Evaluation</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={()=>{}}>
          <Icon type="bar-chart" style={{color:'purple'}}/>
          <span className="nav-text">See reports</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
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