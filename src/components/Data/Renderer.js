import React, { Component } from 'react';
import styled from 'styled-components';
import { Bar, Doughnut } from 'react-chartjs-2';
import { DataConsumer } from '.';
import { getVoteData } from '../../functions/filter';
import Popup from '../Popup';


const Span = styled.span`
    background: #0FCE56;
    border-radius: 50%;
    display: inline-block;
    height: 11px;
    width: 11px;
    margin: 1.8px;
`;
const StyledSelect = styled.select`
  width: auto;
  height: 35px;
  background: white;
  color: black;
  /* font-family: Helvetica; */
  font-size: 14px;
  border: none;
  margin-left: 10px;
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
        loggedIn: false
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

    handleClick(event) {
        if (event.target.dataset.value === 'user') {
            this.setState({ loggedIn: !this.state.loggedIn, selectedChart: 1 })
        } else if (event.target.dataset.value === 'back') {
            this.setState({ selectedChart: this.state.selectedChart - 1 })
        } else if (event.target.value !== 'Välj votering...') {
            let votering_id = event.target.value;
            this.setState({ ...getVoteData(votering_id, this.state.party), votering_id });
        }
    };
    chooseChart() {
        if (this.state.loggedIn) this.setState({ selectedChart: this.state.selectedChart + 1 });
    };

    //ctx.data[this.state.votering_index].forEach((vote, i) => voteRows.push(<Span key={i + vote.fornamn + vote.efternamn} title={`${vote.fornamn} ${vote.efternamn} (${vote.parti}): ${vote.rost}`} style={{ background: backgroundColor[data.labels[0]] }}></Span>))


    onChartClick(chart) {
        if (chart.length > 0) {
            if (chart[0]._chart.config.type === 'bar') {
                console.log(chart)

                console.log(chart[0])
                console.log(chart[1])
                console.log(chart[2])
                console.log(chart[3])

                const party = this.state.parties[chart[0]._index]
                this.setState({ ...getVoteData(this.state.votering_id, party), party: party });
            } else {

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
                    default:
                        break;
                }
                this.setState({ caseIndex: index })
            }
        }
    }

    render() {
        const { yes, no, pass, absent, party, parties, date, title, titleDates, dok_id, votering_id } = this.state;
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
                <button data-value='user' onClick={this.handleClick}>Logga {loggedIn ? 'ut' : 'in'} </button>
                <DataConsumer>
                    {
                        (ctx) => (
                            <>

                                <StyledSelect selectedValue={{ label: "Välj voteiring...", value: 'Välj votering...' }} onChange={this.handleClick}>
                                    {<option value='Välj votering...'>Välj votering...</option>}

                                    {titleDates.map((item, i) => <option key={i} value={i}>{item.title} - {item.date.substr(0, 10)}</option>)}
                                </StyledSelect>
                                <p>Läs mer på <a href={`http://data.riksdagen.se/dokument/${dok_id}`}> http://data.riksdagen.se/dokument/{dok_id}</a> </p>
                                {/* <p style={{ height: '50px', width: '900px', marginTop: '0px' }} onClick={this.handleClick}>Votering: {title} - {date}</p> */}

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
                                    {/* {chartNumber == 1 && */}

                                    <div style={{ width: '50%', fontSize: '8px', marginRight: '10px' }} >

                                        {voteRows}
                                    </div>
                                    {/* } */}
                                    {/* {chartNumber == 2 && loggedIn && */}
                                    <div style={{ width: '50%', marginTop: '-50px', marginLeft: '10px' }} >

                                        <br /><br />
                                        <Bar data={data2} onElementsClick={this.onChartClick.bind(this)} options={options2} />
                                    </div>
                                    {/* } */}
                                    {/* {chartNumber == 3 && loggedIn &&
                                    <div style={{ width: '900px', cursor: loggedIn && 'pointer' }} >
                                        <select defaultValue={this.state.party} onChange={this.handleChange}>
                                            {!party && <option value="Välj parti...">Välj parti...</option>}
                                            {parties.map((party, i) => <option key={i} value={party} >{party}</option>)}
                                        </select>
                                        <Doughnut style={{ display: 'inline' }} data={data} onElementsClick={this.onChartClick.bind(this)} options={options} />
                                        <>

                                            {
                                                this.state[this.state.case].map(
                                                    (e, i) => (
                                                        <span key={i} style={{ position: 'relative', top: '-420px', color: data.datasets[0].backgroundColor[this.state.caseIndex] }}>
                                                            {i === 0 && data.labels[this.state.caseIndex] + ':'}{i === 0 && <br />} {e.namn}<br />
                                                        </span>
                                                    )
                                                )
                                            }
                                        </> */}
                                </div>
                                <Popup id={this.state.votering_id} party={this.state.party} />


                            </>
                        )
                    }
                </DataConsumer>
            </div >
        );
    };
};
