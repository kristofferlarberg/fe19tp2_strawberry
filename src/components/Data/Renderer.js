import React, { Component } from 'react';
import styled from 'styled-components';
import { BarChart } from 'react-chartjs-2';
import { DataConsumer } from '.';
import { getVoteData } from '../../functions/filter';

const Span = styled.span`
    background: #0FCE56;
    border-radius: 50%;
    display: inline-block;
    height: 20px;
    width: 20px;
    margin: 5px;
`;

const options = {
    tooltips: {
        callbacks: {
            title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
            },
            label: function (tooltipItem, data) {
                var dataset = data['datasets'][0];
                var percent = Math.round((dataset.data[tooltipItem.index] / dataset._meta[0].total) * 100);
                return `${data.datasets[0].data[tooltipItem.index]} (${percent}%)`;
            }
        }
    }
};

const x = (amt) => {
    let arr = [];
    for (let i = 0; i < amt; i++) arr[i] = i
    return arr;
}

export default class Renderer extends Component {

    state = {
        votingArray: ['FC1E56AA-9651-46BB-9BDC-2D3EDE51D3F7'],
        votering_id: 0,
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
        this.setState({ ...getVoteData(this.state.votering_id, party), party: party });
    };

    handleClick() {
        let votering_id = Math.min(Math.floor(Math.random() * 10), this.state.votingArray.length - 1);
        this.setState({ ...getVoteData(votering_id, this.state.party), votering_id });
    };

    //ctx.data[this.state.votering_index].forEach((vote, i) => voteRows.push(<Span key={i + vote.fornamn + vote.efternamn} title={`${vote.fornamn} ${vote.efternamn} (${vote.parti}): ${vote.rost}`} style={{ background: backgroundColor[data.labels[0]] }}></Span>))


    onChartClick(chart) {
        if (chart.length > 0) {
            const index = chart[0]._index;
            switch (index) {
                case 0:
                    this.setState({ case: 'yes' });
                    break;
                case 1:
                    this.setState({ case: 'no' });
                    break;
                case 2:
                    this.setState({ case: 'pass' });
                    break;
                case 3:
                    this.setState({ case: 'absent' });
                    break;
            }
            this.setState({ caseIndex: index })
        }
    }

    render() {
        const { yes, no, pass, absent, party, parties, title, date } = this.state;
        const backgroundColor = [
            '#0FCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
        ]


        const data = {
            labels: [
                'Ja',
                'Nej',
                'Avstår',
                'Frånvarande',
            ],
            datasets: [{
                data: [yes.length, no.length, pass.length, absent.length],
                backgroundColor
            }]
        };
        let voteRows = []
        let voteResult = [0, 0, 0, 0]
        return (
            <div style={{ marginLeft: '50px' }}>
                <h1>Riksdagskollen</h1>
                <DataConsumer>
                    {
                        (ctx) => (
                            <>
                                <p onClick={this.handleClick}>Votering: {title} - {date}</p>
                                {
                                    ctx.data[this.state.votering_id].forEach((vote, i) => {
                                        const colorIndex = data.labels.findIndex(value => value === vote.rost);
                                        voteRows.push(
                                            <Span
                                                key={i + vote.efternamn + vote.fornamn}
                                                title={`${vote.fornamn} ${vote.efternamn} (${vote.parti}): ${vote.rost}`}
                                                style={{ background: backgroundColor[colorIndex] }}
                                            />)
                                    }),
                                    [...x(4)].map((i) =>
                                        voteRows.push(<br key={i} />)
                                    ),
                                    this.state.parties.forEach(party => {
                                        let voteObject = getVoteData(this.state.votering_id, party)

                                        voteObject.votes.forEach((v, id) => {
                                            v.map((vote, i) =>
                                                voteRows.push(<Span key={i + vote.fornamn + vote.efternamn} title={`${vote.fornamn} ${vote.efternamn} (${vote.parti}): ${vote.rost}`} style={{ background: backgroundColor[id] }}></Span>))
                                        })
                                        voteRows.push(<Span key={'span' + party} style={{ width: '4px', marginLeft: '-2px', marginRight: '-2px', background: '#CCC', borderRadius: '0' }} />)
                                    }),
                                    [...x(4)].map((i) =>
                                        voteRows.push(<br key={i + 5} />)
                                    ),
                                    console.log(voteRows.length)
                                }
                                <div style={{ width: '900px', textAlign: 'center', cursor: 'pointer' }} >
                                    {
                                        this.state.parties.forEach(party => {
                                            let voteObject = getVoteData(this.state.votering_id, party)
                                            voteObject.votes.forEach((vote, i) => {
                                                voteResult[i] += vote.length;
                                            })
                                        })
                                    }
                                    {voteResult.map((e, i) => {
                                        return <div key={e + i + 'a'} style={{ display: 'inline-block', width: `${e / 349 * 100}%`, textAlign: 'center', cursor: 'pointer', background: backgroundColor[i], marginTop: '20px', marginBottom: '15px' }}>{data.labels[i]}: <br /> {(e / 349 * 100).toFixed(1)}%</div>
                                    })
                                    }

                                    {voteRows}

                                </div>
                            </>
                        )
                    }
                </DataConsumer>
            </div >
        );
    };
};
