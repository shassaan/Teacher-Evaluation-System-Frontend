import React from 'react';
import {List} from 'antd';
import Template from './Template';
import {Styles} from '../../components/Layout/styles/styles';
const TemplateList = (props) => {
    const {templateList = []} = props || {};
    return (
       <List
    grid={{ gutter: 16, column: 4 }}
    dataSource={templateList}
    style={Styles.TemplateListStyle}
    renderItem={item => (
      <List.Item>
        <Template Template={item}/>
      </List.Item>
    )}
  />
    );
}
export default TemplateList;