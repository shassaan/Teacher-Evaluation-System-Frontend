import React from 'react';
import { List } from 'antd';
import Template from './Template';
import { Styles } from '../../components/Layout/styles/styles';
import Question from './Question';
const QuestionList = (props) => {
  const { QuestionList = [] } = props || {};
  return (
    <List
      dataSource={QuestionList}
      style={Styles.QuestionListStyle}
      renderItem={item => (
        <List.Item>
          <Question readonly={props.readonly} updateState = {props.updateState} Question={item} />
        </List.Item>
      )}
    />
  );
}
export default QuestionList;