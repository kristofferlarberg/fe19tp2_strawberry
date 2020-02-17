import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';

export class Visualization extends Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <Doughnut data={data} />
      </>
    )
  }
}

export default Visualization
