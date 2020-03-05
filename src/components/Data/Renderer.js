import React, { Component } from 'react';
import styled from 'styled-components';
import InfoCircle from '../icons/info-circle-solid.svg';
import { Bar, Doughnut } from 'react-chartjs-2';
import { DataContext, withData } from '.';
import { TextField } from '@material-ui/core';
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

const DocH1 = styled.h1`
    font-size: 3.1rem;
    margin: 0px;
    margin-right: 0.7rem;
    
`;

const DocText = styled.h3`
font-family:Roboto;
line-height: 1.2rem;
font-size:1.1rem;
font-weight:400;
margin: 0;
`
const InfoIcon = styled.img`
    width:35px;
    margin-bottom: -12px;
    &:hover{
        filter: opacity(0.7);
    }
`

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

class Renderer extends Component {

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
        this.setState(this.props.data.getVoteData(this.state.votering_id, this.state.party));
    }

    handleSearchChange(event, values) {
        if (!values) {
            this.setState({ loggedIn: false })
            return;
        }

        const index = this.state.titleDates.findIndex(i => i.title === values.title);
        let votering_id = index;
        this.setState({ ...this.props.data.getVoteData(votering_id, this.state.party), votering_id, loggedIn: true });
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
            this.setState({ ...this.props.data.getVoteData(this.state.votering_id, party), party: party });

        }
    }

    render() {
        const { popup, yes, no, pass, absent, party, parties, date, title, titleDates, dok_id, votering_id } = this.state;
        const backgroundColor = [
            '#0FCE56',
            '#FF6384',
            '#FFCE56',
            '#85a8d3',

            /*             '#04E762',
                        '#EF3054',
                        '#F5B700',
                        '#F5B700', */

        ]
        let loggedIn = this.state.loggedIn
        let loggedOut = !this.state.loggedIn
        let chartNumber = this.state.selectedChart
        let totalVoteResult = [0, 0, 0, 0]
        let voteResult = []
        for (let i = 0; i < 4; i++) {
            voteResult.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        const _data = {
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

        const { data } = this.props;

        return (
            <div style={{ width: '1000px', marginLeft: '50px', height: '100vh' }}>
                {this.props.authUser && this.props.authUser.branding ? Object.keys(this.props.authUser.branding): null}
                <div style={{ display: 'flex', alignItems: 'center', width: '900px' }}>
                    <DocH1>{dok_id && dok_id.substr(4)}</DocH1> <DocText>{title && title.substr(title.indexOf(dok_id.substr(4)) + dok_id.substr(4).length)} - {date}</DocText>
                </div >
                {/* <button style={{ marginBottom: '20px' }} data-value='user' onClick={this.handleClick}>Logga {loggedIn ? 'ut' : 'in'} </button> */}
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '1rem', }}>
                    <Search data={data} handleChange={this.handleSearchChange} />

                    <InfoIcon src={InfoCircle} data-value='link' onClick={this.handleClick} style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem' }} />
                </div>
                {
                    data.rawData.length > 0 && data.rawData[this.state.votering_id].forEach((vote, i) => {
                        const colorIndex = data2.datasets.findIndex(value => value.label === vote.rost);
                        voteRows.push(
                            <Span
                                key={i + vote.namn}
                                title={loggedIn ? `${vote.namn} (${vote.parti}): ${vote.rost}` : null}
                                style={{ transitionDuration: '0.5s', background: loggedIn ? backgroundColor[colorIndex] : '#ddd' }}
                            />)
                    })
                }
                {
                    this.state.parties.forEach((party, id) => {
                        let voteObject = this.props.data.getVoteData(this.state.votering_id, party)
                        voteObject.votes.forEach((vote, i) => {
                            voteResult[i][id] += vote.length;
                            totalVoteResult[i] += vote.length;
                        })
                    })
                }
                {
                    totalVoteResult.map((e, i) => {
                        return loggedIn ?
                            <div key={i + 'a'} style={{ display: 'inline-block', transition: 'width 0.5s', boxSizing: 'border-box', width: `${e / 349 * 898}px`, height: '50px', textAlign: 'center', background: backgroundColor[i], border: e > 0 && '1px solid white', marginTop: '9px', marginBottom: '24px' }}> {e >= 10 ? `${data2.datasets[i].label}:` : <br />} <br /> {e >= 10 && `${(e / 349 * 100).toFixed(1)}%`}</div>
                            : <div key={i + 'a'} style={{ display: 'inline-block', transition: 'width 0.5s', boxSizing: 'border-box', width: `${0.25 * 898}px`, height: '50px', textAlign: 'center', background: '#eee', border: '1px solid white', marginTop: '9px', marginBottom: '24px' }}><br /><br /></div>
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

                {this.state.docPopup && <DocPopup handleClick={this.handleClick} dok_id={dok_id} />}
            </div >

        );
    };
};
export default Renderer