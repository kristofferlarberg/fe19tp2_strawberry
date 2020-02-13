import React, { Component, Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';


let bet = []
let votingArray = ['E9E6D48F-1FFE-4AFE-A9A6-752293FAB149'];
let votingData = JSON.parse(localStorage.getItem('votingData'));
const API1 = 'http://data.riksdagen.se/dokumentlista/?sok=&doktyp=votering&rm=&sz=50&from=2019-12-31&tom=2020-02-13&ts=&bet=&tempbet=&nr=&org=&iid=&webbtv=&talare=&exakt=&planering=&sort=datum&sortorder=desc&rapport=&utformat=json&a=s#soktraff'

export default class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votering_id: votingArray[0],
            date: '',
            party: '',
            parties: [],
            yes: [],
            no: [],
            pass: [],
            absent: [],
            hasData: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (!votingData) {
            votingData = []

            fetch(API1)
                .then((data) => data.json())
                .then((data) => {
                    let beteckning = data.dokumentlista.dokument

                    beteckning.map(item => {
                        return (!bet.includes(item.beteckning)) ? bet.push(item.beteckning) : null;
                    });

                    for (let i = 0; i < 10; i++) {
                        fetch(`http://data.riksdagen.se/voteringlista/?rm=2019%2F20&bet=${bet[i]}&punkt=&valkrets=&rost=&iid=&sz=349&utformat=JSON&gruppering=`)
                            .then((data) => data.json())
                            .then((data) => {
                                votingData.push(data.voteringlista.votering);
                                localStorage.setItem('votingData', JSON.stringify(votingData));
                            });
                    }
                    this.getData();
                })
        } else {
            this.getData();
        };
    };

    getData(currentParty, currentId = this.state.votering_id) {
        if (votingData) {
            votingData.forEach(votering => {
                votering.forEach(id => {
                    (!votingArray.includes(id.votering_id)) && votingArray.push(id.votering_id);
                })
            });
            let parties = [];
            votingData.forEach(votering => {
                let voting = votering.filter(id => id.votering_id === currentId);
                if (voting.length) {
                    voting.map((party) => {
                        return (!parties.includes(party.parti)) ? parties.push(party.parti) : null;
                    })
                    let members = voting.filter(member => member.parti === currentParty);
                    this.setState({
                        date: voting[0].systemdatum.substring(0, 10),
                        parties: parties,
                        yes: members.filter(vote => vote.rost === 'Ja'),
                        no: members.filter(vote => vote.rost === 'Nej'),
                        pass: members.filter(vote => vote.rost === 'Avstår'),
                        absent: members.filter(vote => vote.rost === 'Frånvarande'),
                        hasData: true,
                    });
                    return
                }
            })
        };
    };

    handleChange(event) {
        this.setState({ party: event.target.value, hasData: false });
        this.getData(event.target.value);
    };

    handleClick() {
        let i = Math.floor(Math.random() * 10);
        this.setState({ votering_id: votingArray[i], hasData: false });
        this.getData(this.state.party, votingArray[i]);
    };

    render() {
        const { parties, yes, no, pass, absent } = this.state;
        const data = {
            labels: [
                'Ja',
                'Nej',
                'Avstår',
                'Frånvarande',
            ],
            datasets: [{
                data: [this.state.yes.length, this.state.no.length, this.state.pass.length, this.state.absent.length],
                backgroundColor: [
                    '#0FCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ],
            }]
        };
        let returnValue = <p>Loading data...</p>;
        if (this.state.hasData) {
            returnValue = [
                <p key='0' onClick={this.handleClick}>Voterings-id: {this.state.votering_id} - {this.state.date}</p>,
                <select key='1' onChange={this.handleChange}>
                    {!this.state.party && <option value="Välj parti...">Välj parti...</option>}
                    {parties.map((party, i) => <option key={i} value={party}>{party}</option>)}
                </select>,
                <Doughnut key='2' data={data} />,
                <Fragment key='3'>
                    {yes.map((e, i) => <p key={i} style={{ color: '#0FCE56' }}>Ja: {e.fornamn} {e.efternamn}</p>)}
                    {no.map((e, i) => <p key={i} style={{ color: '#FF6384' }}>Nej: {e.fornamn} {e.efternamn}</p>)}
                    {pass.map((e, i) => <p key={i} style={{ color: '#36A2EB' }}>Avstår: {e.fornamn} {e.efternamn}</p>)}
                    {absent.map((e, i) => <p key={i} style={{ color: '#FFCE56' }}>Frånvarande: {e.fornamn} {e.efternamn}</p>)}
                </Fragment>]
        };
        return (
            <div style={{ marginLeft: '50px' }}>
                {returnValue}
            </div >
        );
    };
};