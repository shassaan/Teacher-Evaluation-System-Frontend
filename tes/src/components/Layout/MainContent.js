import React,{ Component } from "react";

class MainContent extends Component{
    render(){
        return(
            <>
             {this.props.children}
            </>
        );
    }
}

export default MainContent;