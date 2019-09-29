import React, { Component } from 'react';
import {
  BarChart
} from 'react-d3-components';



export default class chart extends Component {

  constructor(props){
    super(props);
  }
  render() {
    const data = this.props.data;
    return (
      <BarChart
        data={data}
        width={800}
        height={400}
        margin={{top: 20, bottom: 50, left: 50, right: 10}}/>
    );
  }
}
