import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DataConsumer } from '.';
import { getVoteData } from '../../functions/filter';

const options = {
    tooltips: {
        callbacks: {
            title: function(tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
            },
            label: function(tooltipItem, data) {
                const dataset = data['datasets'][0];
                // TODO: Find a way to get the meta index in another way / or not have it increase
                
                const getMeta = (index = 0) => dataset._meta[index] || getMeta(index + 1);
                const percent = Math.round((dataset.data[tooltipItem.index] / getMeta().total) * 100);

                return `${data.datasets[0].data[tooltipItem.index]} (${percent}%)`;
            }
        }
    }
};

export default class Members extends Component {

    state = {
        votingArray: ['FC1E56AA-9651-46BB-9BDC-2D3EDE51D3F7'],
        votering_id: 'FC1E56AA-9651-46BB-9BDC-2D3EDE51D3F7',
        title: '',
        caseIndex: 0,
        case: 'yes',
        date: '',
        party: 'S',
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
        this.setState(getVoteData(this.state.votering_id, this.state.party));
    }

    handleChange(event) {
        const party = event.target.value;
        this.setState({...getVoteData(this.state.votering_id, party), party: party});
    };

    handleClick() {
        let i = Math.min(Math.floor(Math.random() * 10), this.state.votingArray.length - 1);
        const votering_id = this.state.votingArray[i];
        this.setState({...getVoteData(votering_id, this.state.party), votering_id});
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
