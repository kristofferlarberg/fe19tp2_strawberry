import React, { Component } from 'react';
import styled from 'styled-components';
import InfoCircle from '../icons/info-circle-solid.svg';
import { Bar, Doughnut } from 'react-chartjs-2';
import { DataContext, withData } from '.';
import { TextField } from '@material-ui/core';
import DocPopup from './DocPopup';
import Popup from '../Popup';
import Search from '../Search';
import LogPopup from '../LogPopup';
import ToggleDarkLight from '../ToggleDarkLight';
import { ThemeProvider } from 'styled-components';



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
font-size:1.3rem;
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

const options2 = {
    scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
    },
    legend: {
        onClick: null
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
const options1 = {
    scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
    },
    legend: {
        onClick: null

    },
    maintainAspectRatio: true,
    tooltips: {
        enabled: false

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
        active: false,
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
            this.setState({ active: false })
            return;
        }

        const index = this.state.titleDates.findIndex(i => i.title === values.title);
        let votering_id = index;
        this.setState({ ...this.props.data.getVoteData(votering_id, this.state.party), votering_id, active: true });
    }

    handleClick(event) {
        if (event.target.dataset.value === 'user') {
            this.setState({ active: !this.state.active, selectedChart: 1 })
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
        let active = this.state.active
        let loggedOut = !this.state.active
        let chartNumber = this.state.selectedChart
        let totalVoteResult = [0, 0, 0, 0]
        let voteResult = []
        for (let i = 0; i < 4; i++) {
            voteResult.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        const data2 = {
            labels: [
                ...this.state.parties
            ],
            datasets: [{
                label: 'Ja',
                data: voteResult[0],
                backgroundColor: active ? backgroundColor[0] : '#ddd',
            },
            {
                label: 'Nej',
                data: voteResult[1],
                backgroundColor: active ? backgroundColor[1] : '#ddd',

            },
            {
                label: 'Avstår',
                data: voteResult[2],
                backgroundColor: active ? backgroundColor[2] : '#eee',
            },
            {
                label: 'Frånvarande',
                data: voteResult[3],
                backgroundColor: active ? backgroundColor[3] : '#eee',
            }

            ]
        };
        let voteRows = []

        const { data } = this.props;

        return (
            <div style={{ width: '1045px', marginLeft: '50px', height: '100vh', marginTop: '20px' }}>
                {this.props.authUser && this.props.authUser.branding ? 'AFTONBLADET' : null}
                <div style={{ display: 'flex', alignItems: 'center', width: '900px' }}>
                    {active ? <DocH1>{dok_id && dok_id.substr(4)}</DocH1> : <DocH1>Riksdagskollen</DocH1>}
                    {active && <DocText>{title && title.substr(title.indexOf(dok_id.substr(4)) + dok_id.substr(4).length)} - {date}</DocText>}
                    < ToggleDarkLight />
                </div >
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '1rem', }}>
                    <Search data={data} handleChange={this.handleSearchChange} />

                    <InfoIcon src={InfoCircle} data-value='link' onClick={active && !popup && this.handleClick} style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem' }} />
                </div>

                <div style={{ display: 'flex', width: '100%' }}>
                    {
                        data.rawData.length > 0 && data.rawData[this.state.votering_id].forEach((vote, i) => {
                            const colorIndex = data2.datasets.findIndex(value => value.label === vote.rost);
                            voteRows.push(
                                <Span
                                    key={i + vote.namn}
                                    title={active ? `${vote.namn} (${vote.parti}): ${vote.rost}` : null}
                                    style={{ transitionDuration: '0.5s', background: active ? backgroundColor[colorIndex] : '#ddd' }}
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
                            return active ?
                                <div key={i + 'a'} style={{ display: 'inline-block', transition: 'width 0.5s', boxSizing: 'border-box', width: `${e / 349 * 1000}px`, height: '50px', textAlign: 'center', background: backgroundColor[i], border: e > 0 && '1px solid white', marginTop: '9px', marginBottom: '24px' }}> {e >= 10 ? `${data2.datasets[i].label}:` : <br />} <br /> {e >= 10 && `${(e / 349 * 100).toFixed(1)}%`}</div>
                                : <div key={i + 'a'} style={{ display: 'inline-block', transition: 'width 0.5s', boxSizing: 'border-box', width: `${0.25 * 1000}px`, height: '50px', textAlign: 'center', background: '#eee', border: '1px solid white', marginTop: '9px', marginBottom: '24px' }}><br /><br /></div>
                        })
                    }</div>

                <div style={{ display: 'flex', width: '1000px', textAlign: 'center', overflow: 'hidden', cursor: active && 'pointer' }} >

                    <div style={{ width: '50%', fontSize: '8px', marginRight: '10px' }} >

                        {voteRows}
                    </div>
                    <div style={{ width: '50%', marginTop: '-50px', marginLeft: '10px' }} >

                        <br /><br />
                        <Bar data={data2} onElementsClick={active && this.onChartClick} options={active ? options2 : options1} />
                    </div>
                </div>
                {popup && !this.state.docPopup && <Popup handleClick={this.handleClick} id={votering_id} party={party} />}

                {this.state.docPopup && <DocPopup handleClick={this.handleClick} dok_id={dok_id} />}
            </div >

        );

    };
};
export default Renderer