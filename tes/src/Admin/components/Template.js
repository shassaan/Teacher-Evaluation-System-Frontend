import React from 'react';
import {Card, Button} from 'antd';
import {Container} from 'reactstrap';
const Template = (props) => {
    const {Template = {}} = props || {};
    return (
        <Container>
        <Card  title={Template.tName} bordered={true}>
                <div>
                    <table><tr><td><Button icon="plus" type="dashed"></Button></td><td><Button icon="eye" type="ghost"></Button></td></tr></table>
                </div>
            </Card>
        </Container>
    );
            
    
}

export default Template;