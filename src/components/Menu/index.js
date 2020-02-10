import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Renderer from '../Data/Renderer'
import Filter_vote from '../Voterings-filter-id';

const HTML_TAG_ESCAPE = /<(.*?)>/g

export class Menu extends Component {

    state = {
        selectedTitle: '',
        selectedDescription: '',
    }

    constructor(props) {
        super(props);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            selectedTitle: this.props.data[0].title,
            selectedDescription: this.props.data[0].description.replace(HTML_TAG_ESCAPE, ' ')
        })
    }

    onSelectChange(e) {
        const { data } = this.props;

        this.setState({
            selectedTitle: e.target.value,
            selectedDescription: data.filter((v) => v.title === e.target.value)[0].description.replace(HTML_TAG_ESCAPE, ' ')
        })
    }

    render() {
        const renderSubMenu = () => this.props.subMenu.map((item, i) => <li key={i}><Link to={item.href}>{item.name}</Link></li>);
        const { data } = this.props;
        const { selectedTitle, selectedDescription } = this.state;

        return (
            <>
                <select value={selectedTitle} onChange={this.onSelectChange}>
                    {data.map((votering, i) => <option key={i} value={votering.title}>{votering.title}</option>)}
                </select>

                <Renderer title={selectedTitle} description={selectedDescription} />
            </>
        )
    }
}

export default Menu
