import React, { Component } from 'react';
import styled from 'styled-components';
import { Bar, Doughnut } from 'react-chartjs-2';
import { DataConsumer } from '.';
import { getVoteData } from '../../functions/filter';
import DocPopup from './DocPopup';
import Popup from '../Popup';
import Search from '../Search';


const Span = styled.span`
    background: #0FCE56;
    border-radius: 50%;
    display: inline-block;
    height: 11px;
    width: 11px;
    margin: 1.8px;
`;

const options = {
    tooltips: {
        callbacks: {
            title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
            }
            // label: function (tooltipItem, data) {
            //     var dataset = data['datasets'][0];
            //     var percent = Math.round((dataset.data[tooltipItem.index] / dataset._meta[0].total) * 100);
            //     return `${data.datasets[0].data[tooltipItem.index]} (${percent}%)`;
            // }
        }
    }
};
const options2 = {
    scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
    },
    maintainAspectRatio: true,
    tooltips: {
        mode: 'label',
        callbacks: {
            label: function (tooltipItem, data) {
                return ` ${data.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.yLabel} st `;
            }
        }
    }
};

// const x = (amt) => {
//     let arr = [];
//     for (let i = 0; i < amt; i++) arr[i] = i
//     return arr;
// }

export default class Renderer extends Component {

    state = {
        votingArray: ['FC1E56AA-9651-46BB-9BDC-2D3EDE51D3F7'],
        votering_id: 0,
        title: '',
        caseIndex: 0,
        dok_id: '',
        case: 'yes',
        titleDates: [],
        date: '',
        party: 'S',
        parties: [],
        yes: [],
        no: [],
        pass: [],
        absent: [],
        selectedChart: 1,
        loggedIn: false,
        descriptiondata: '',
        dok_id: '',
        popup: false,
        docPopup: false,
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.onChartClick = this.onChartClick.bind(this);
    }

    componentDidMount() {
        this.setState(getVoteData(this.state.votering_id, this.state.party));
    }

    handleSearchChange(event, values) {
        /* const index = this.state.titleDates.map(function (e) { return e.title; }).indexOf(values.title); */
        //console.log(values)
        if (!values) {
            this.setState({ loggedIn: false })
            return;
        }
        const index = this.state.titleDates.findIndex(i => i.title === values.title);
        let votering_id = index;
        this.setState({ ...getVoteData(votering_id, this.state.party), votering_id });
        console.log(event)
    }
    handleClick(event) {
        if (event.target.dataset.value === 'user') {
            this.setState({ loggedIn: !this.state.loggedIn, selectedChart: 1 })
        } else if (event.target.dataset.value === 'link') {
            this.setState({ docPopup: true });
        } else {
            this.setState({ popup: false, docPopup: false })
        }
    };

    onChartClick(chart) {
        if (chart.length > 0) {
            const party = this.state.parties[chart[0]._index]
            this.setState({ popup: true })
            this.setState({ ...getVoteData(this.state.votering_id, party), party: party });

        }
    }

    render() {
        const { popup, yes, no, pass, absent, party, parties, date, title, titleDates, dok_id, votering_id } = this.state;
        const backgroundColor = [
            '#0FCE56',
            '#FF6384',
            '#FFCE56',
            '#85a8d3',
        ]
        let loggedIn = this.state.loggedIn
        let chartNumber = this.state.selectedChart
        let totalVoteResult = [0, 0, 0, 0]
        let voteResult = []
        for (let i = 0; i < 4; i++) {
            voteResult.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        const data = {
            labels: [
                'Ja',
                'Nej',
                'Avstår',
                'Frånvarande',
            ],
            datasets: [{
                data: [yes.length, no.length, pass.length, absent.length],
                backgroundColor: loggedIn ? backgroundColor : '#ddd',
            }]
        };
        let data2 = {
            labels: [
                ...this.state.parties
            ],
            datasets: [{
                label: 'Ja',
                data: voteResult[0],
                backgroundColor: loggedIn ? backgroundColor[0] : '#ddd',
            },
            {
                label: 'Nej',
                data: voteResult[1],
                backgroundColor: loggedIn ? backgroundColor[1] : '#ddd',

            },
            {
                label: 'Avstår',
                data: voteResult[2],
                backgroundColor: loggedIn ? backgroundColor[2] : '#eee',
            },
            {
                label: 'Frånvarande',
                data: voteResult[3],
                backgroundColor: loggedIn ? backgroundColor[3] : '#eee',
            }

            ]
        };
        let voteRows = []
        return (
            <div style={{ width: '900px', marginLeft: '50px' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '900px' }}>
                    <h1 style={{ fontSize: '4rem', margin: '0px', marginRight: '20px' }}>{dok_id && dok_id.substr(4)}</h1> <h3 style={{ lineHeight: '1.2rem' }}>{title && title.substr(title.indexOf(dok_id.substr(4)) + dok_id.substr(4).length)} - {date}</h3>
                </div >
                <button style={{ marginBottom: '20px' }} data-value='user' onClick={this.handleClick}>Logga {loggedIn ? 'ut' : 'in'} </button>
                <DataConsumer>
                    {
                        (ctx) => (
                            <>

                                <div>
                                    <Search
                                        handleChange={this.handleSearchChange}
                                    />
                                </div>
                                <button data-value='link' onClick={this.handleClick} style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem' }}>Läs mer</button>

                                {
                                    ctx.data[this.state.votering_id].forEach((vote, i) => {
                                        const colorIndex = data2.datasets.findIndex(value => value.label === vote.rost);
                                        voteRows.push(
                                            <Span
                                                key={i + vote.namn}
                                                title={loggedIn ? `${vote.namn} (${vote.parti}): ${vote.rost}` : null}
                                                style={{ transitionDuration: '0.5s', background: loggedIn ? backgroundColor[colorIndex] : '#ddd' }}
                                            />)
                                    })
                                    // [...x(4)].map((i) =>
                                    //     voteRows.push(<br key={i} />)
                                    // ),
                                    // this.state.parties.forEach(party => {
                                    //     let voteObject = getVoteData(this.state.votering_id, party)

                                    //     voteObject.votes.forEach((v, id) => {
                                    //         v.map((vote, i) =>
                                    //             voteRows.push(<Span key={i + vote.fornamn + vote.efternamn} title={`${vote.fornamn} ${vote.efternamn} (${vote.parti}): ${vote.rost}`} style={{ background: backgroundColor[id] }}></Span>))
                                    //     })
                                    //     voteRows.push(<Span key={'span' + party} style={{ width: '4px', marginLeft: '-2px', marginRight: '-2px', background: '#CCC', borderRadius: '0' }} />)
                                    // })
                                }
                                {
                                    this.state.parties.forEach((party, id) => {
                                        let voteObject = getVoteData(this.state.votering_id, party)
                                        voteObject.votes.forEach((vote, i) => {
                                            voteResult[i][id] += vote.length;
                                            totalVoteResult[i] += vote.length;
                                        })
                                    })
                                }
                                {totalVoteResult.map((e, i) => {
                                    return loggedIn ?
                                        <div key={i + 'a'} style={{ display: 'inline-block', transition: 'width 0.5s', boxSizing: 'border-box', width: `${e / 349 * 898}px`, textAlign: 'center', background: backgroundColor[i], border: e > 0 && '1px solid white', marginTop: '9px', marginBottom: '24px' }}> {e >= 10 ? `${data2.datasets[i].label}:` : <br />} <br /> {e >= 10 && `${(e / 349 * 100).toFixed(1)}%`}</div>
                                        : <div key={i + 'a'} style={{ display: 'inline-block', transition: 'width 0.5s', boxSizing: 'border-box', width: `${0.25 * 898}px`, textAlign: 'center', background: '#eee', border: '1px solid white', marginTop: '9px', marginBottom: '24px' }}><br /><br /></div>
                                })
                                }
                                <div style={{ display: 'flex', width: '900px', textAlign: 'center', overflow: 'hidden', cursor: loggedIn && 'pointer' }} >

                                    <div style={{ width: '50%', fontSize: '8px', marginRight: '10px' }} >

                                        {voteRows}
                                    </div>
                                    <div style={{ width: '50%', marginTop: '-50px', marginLeft: '10px' }} >

                                        <br /><br />
                                        <Bar data={data2} onElementsClick={this.onChartClick} options={options2} />
                                    </div>
                                </div>
                                {popup && <Popup handleClick={this.handleClick} id={votering_id} party={party} />}


                            </>
                        )
                    }
                </DataConsumer>
                {this.state.docPopup && <DocPopup handleClick={this.handleClick} dok_id={dok_id} />}
            </div >
        
        );
    };
};
