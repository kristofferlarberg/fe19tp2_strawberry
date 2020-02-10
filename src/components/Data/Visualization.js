import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ["Ja", "Nej", "Avstår", "Frånvarande"],

  datasets: [
    {
      data: [94, 64, 21, 130],
      backgroundColor: []
    }
  ]
}

for (let i = 0; i < data.labels.length; i++) {

  data.datasets[0].backgroundColor[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export class Visualization extends Component {
  render() {
    for (let i = 0; i < data.labels.length; i++) {
      data.datasets[0].data[i] = Math.floor(Math.random() * 126);
    }
    return (
      <>
        <Doughnut data={data} />
      </>
    )
  }
}

export default Visualization
