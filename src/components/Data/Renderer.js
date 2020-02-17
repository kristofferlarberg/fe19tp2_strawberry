import React, { Component } from 'react'
import Visualization from './Visualization'
import { DataConsumer } from '.';
import { Doughnut } from 'react-chartjs-2';


export class Renderer extends Component {


    render() {
        return (
            <div>
                <DataConsumer>
                </DataConsumer>
            </div>
        )
    }
}

export default Renderer
