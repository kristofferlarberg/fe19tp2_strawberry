import React, { Component, Fragment, createContext } from 'react';

let bet = []
let votingData = JSON.parse(localStorage.getItem('votingData'));
const API_QUERY = 'http://data.riksdagen.se/dokumentlista/?sok=&doktyp=votering&rm=&sz=50&from=2019-12-31&tom=2020-02-13&ts=&bet=&tempbet=&nr=&org=&iid=&webbtv=&talare=&exakt=&planering=&sort=datum&sortorder=desc&rapport=&utformat=json&a=s#soktraff'

const {Provider, Consumer} = createContext();

export default class DataContext extends Component {

    state = {
        data: {},
        hasData: false
    };
    
    componentDidMount() {
        if (!votingData) {
            votingData = []

            fetch(API_QUERY)
                .then((data) => data.json())
                .then((data) => {
                    let beteckning = data.dokumentlista.dokument
                    let titles = []
                    beteckning.map(item => {
                        return (!bet.includes(item.beteckning)) ? bet.push(item.beteckning) && titles.push(item.titel) : null;
                    });
                    for (let i = 0; i < 14; i++) {
                        fetch(`http://data.riksdagen.se/voteringlista/?rm=2019%2F20&bet=${bet[i]}&punkt=&valkrets=&rost=&iid=&sz=349&utformat=JSON&gruppering=`)
                            .then((data) => data.json())
                            .then((data) => {
                                data.voteringlista.votering[0].titel = titles[i]
                                votingData.push(data.voteringlista.votering);
                                localStorage.setItem('votingData', JSON.stringify(votingData));
                                this.setState({ data, hasData: true })
                            });
                    }
                })
        } else {
            this.setState({ data: JSON.parse(localStorage.getItem('votingData')), hasData: true });
        };
    };

    render() {
        return (
            <Provider value={this.state}>
                {this.state.hasData && this.props.children}
            </Provider>
        );
    };
};

export {
    Consumer as DataConsumer
}
