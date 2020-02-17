import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DataConsumer } from '.';

const votingArray = ['FC1E56AA-9651-46BB-9BDC-2D3EDE51D3F7'];

const options = {
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItem, data) {
            var dataset = data['datasets'][0];
            var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
            return `${data['datasets'][0]['data'][tooltipItem['index']]} (${percent}%)`;
        }
      }
    }
  }

export default class Members extends Component {

    state = {
        votering_id: votingArray[0],
        title: '',
        caseIndex: 0,
        case: 'yes',
        date: '',
        party: '',
        parties: [],
        yes: [],
        no: [],
        pass: [],
        absent: []
    }
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        this.getData();
    }

    handleChange(event) {
        this.setState({ party: event.target.value });
        this.getData(event.target.value);
    };

    handleClick() {
        let i = Math.min(Math.floor(Math.random() * 10), votingArray.length);
        this.setState({ votering_id: votingArray[i] });
        this.getData(this.state.party, votingArray[i]);
    };

    getData(currentParty, currentId = this.state.votering_id) {
        const votingData = JSON.parse(localStorage.getItem('votingData'))
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
                        title: voting[0].titel,
                        parties: parties,
                        yes: members.filter(vote => vote.rost === 'Ja'),
                        no: members.filter(vote => vote.rost === 'Nej'),
                        pass: members.filter(vote => vote.rost === 'Avstår'),
                        absent: members.filter(vote => vote.rost === 'Frånvarande')
                    });
                    return
                }
            })
        };
    };

    onChartClick(chart) {
        if (chart.length > 0) {
            const index = chart[0]._index;
            switch(index) {
                case 0:
                    this.setState({case: 'yes'});
                    break;
                case 1:
                    this.setState({case: 'no'});
                    break;
                case 2:
                    this.setState({case: 'pass'});
                    break;
                case 3:
                    this.setState({case: 'absent'});
                    break;    
            }
            this.setState({ caseIndex: index })
        }
    }

    render() {
        const { yes, no, pass, absent, party, parties, title, date } = this.state;

        const data = {
            labels: [
                'Ja',
                'Nej',
                'Avstår',
                'Frånvarande',
            ],
            datasets: [{
                data: [yes.length, no.length, pass.length, absent.length],
                backgroundColor: [
                    '#0FCE56',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ],
            }]
        };

        return (
            <div style={{ marginLeft: '50px' }}>
                <DataConsumer>
                    {
                        (ctx) => (
                            <>
                                <p onClick={this.handleClick}>Votering: {title} - {date}</p>

                                <select onChange={this.handleChange}>
                                    {!party && <option value="Välj parti...">Välj parti...</option>}
                                    {parties.map((party, i) => <option key={i} value={party}>{party}</option>)}
                                </select>

                                <Doughnut data={data} onElementsClick={this.onChartClick.bind(this)} options={options} />
                                <>
                                    {
                                        this.state[this.state.case].map(
                                            (e, i) => (
                                                <p key={i} style={{ color: data.datasets[0].backgroundColor[this.state.caseIndex] }}>
                                                    {data.labels[this.state.caseIndex]}: {e.fornamn} {e.efternamn}
                                                </p>
                                            )
                                        )
                                    }
                                </>
                            </>
                        )
                    }
                </DataConsumer>
            </div>
        );
    };
};
