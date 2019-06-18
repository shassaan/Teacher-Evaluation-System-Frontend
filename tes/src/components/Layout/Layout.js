import React,{Component} from 'react';
import MyFooter from './Footer';
import Header from './Header';
import MainContent from './MainContent';
class UserLayout extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
                <Header />
                <MainContent>
                    <div className="container">
                       {this.props.children}
                    </div>
                </MainContent>
                <MyFooter />
            </>
        );
    }
}

export default UserLayout;