import React, { Component } from 'react'
import Visualization from './Visualization'


export class Renderer extends Component {


    render() {
        const { title, description } = this.props;

        return (
            <div>
                
                <p><strong>{title}</strong></p>
                <a href={description} target='_blank'>Läs mer</a>

                {/* <Visualization /> */}
            </div>
        )
    }
}

export default Renderer
