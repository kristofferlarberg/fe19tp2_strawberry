import React, { Component } from 'react';
import styled from 'styled-components';
import InfoCircle from '../icons/info-circle-solid.svg';
import { Bar } from 'react-chartjs-2';
import DocPopup from './DocPopup';
import Popup from '../Popup';
import Search from '../Search';

import S from '../images/partylogos/S.svg';
import V from '../images/partylogos/V.svg';
import C from '../images/partylogos/C.svg';
import M from '../images/partylogos/M.svg';
import L from '../images/partylogos/L.svg';
import KD from '../images/partylogos/KD.svg';
import MP from '../images/partylogos/MP.svg';
import SD from '../images/partylogos/SD.svg';

const Logos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 45%;
    background-color: ${props => props.theme.body};
    z-index: 1;
`;

const Span = styled.span`
    background: #0fce56;
    border-radius: 50%;
    display: inline-block;
    height: 11px;
    width: 11px;
    margin: 2.5px;
`;

const DocH1 = styled.h1`
    font-size: 3.1rem;
    margin: 0px;
    margin-right: 0.7rem;
    color: ${props => props.theme.text};
`;

const DocText = styled.h3`
    font-family: Roboto;
    line-height: 1.2rem;
    font-size: 1.3rem;
    font-weight: 400;
    margin: 0;
`;
const InfoIcon = styled.img`
    width: 35px;
    margin-right: 0.7rem;
    cursor: pointer;
    &:hover {
        filter: opacity(0.7);
    }
`;
const Main = styled.div`
    grid-column-start: 2;
    height: 100vh;
    padding-top: 20px;
    box-sizing: border-box;
    margin: 0 auto;
`;

const options1 = {
    scales: {
        xAxes: [
            {
                stacked: true,
                ticks: {
                    fontColor: 'white'
                },
                gridLines: {
                    display: false
                }
            }
        ],
        yAxes: [
            {
                stacked: true,
                ticks: {
                    display: false
                },
                gridLines: {
                    drawBorder: false
                }
            }
        ]
    },
    legend: {
        onClick: null
    },
    maintainAspectRatio: true,
    tooltips: {
        enabled: false
    }
};

const options2 = {
    scales: {
        xAxes: [
            {
                stacked: true,
                ticks: {
                    fontColor: 'white'
                },
                gridLines: {
                    display: false
                }
            }
        ],
        yAxes: [
            {
                stacked: true,
                ticks: {
                    display: false
                },
                gridLines: {
                    drawBorder: false
                }
            }
        ]
    },
    legend: {
        onClick: null
    },
    maintainAspectRatio: true,
    tooltips: {
        mode: 'label',
        callbacks: {
            label: function (tooltipItem, data) {
                return ` ${data.datasets[tooltipItem.datasetIndex].label}: ${
                    tooltipItem.yLabel
                    } st `;
            }
        }
    }
};

class Renderer extends Component {
    state = {
        votingArray: ['FC1E56AA-9651-46BB-9BDC-2D3EDE51D3F7'],
        votering_id: 0,
        title: '',
        caseIndex: 0,
        dok_id: '',
        titleDates: [],
        date: '',
        party: 'S',
        parties: [],
        active: false,
        descriptiondata: '',
        popups: [],
        docPopup: false
    };

    constructor(props) {
        super(props);
        this.handlePopup = this.handlePopup.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.onChartClick = this.onChartClick.bind(this);
    }

    componentDidMount() {
        this.setState(
            this.props.data.getVoteData(
                this.state.votering_id,
                this.state.party
            )
        );
    }

    handleSearchChange(event, values) {
        if (!values) {
            this.setState({ active: false });
            return;
        }

        const index = this.state.titleDates.findIndex(
            i => i.title === values.title
        );
        if (index !== -1) {
            let votering_id = index;
            const votingData = this.props.data.getVoteData(
                votering_id,
                this.state.party
            );
            this.setState({
                ...votingData,
                votering_id,
                active: true
            });
            const _s = 'search-history';
            if (!localStorage.getItem(_s)) {
                localStorage.setItem(_s, '[]');
            }
            const searchHistory = JSON.parse(
                localStorage.getItem('search-history')
            );

            searchHistory.unshift(votingData.titleDates[votering_id].title);
            localStorage.setItem(_s, JSON.stringify(searchHistory));
        }
    }

    handlePopup(i, event) {
        let checkPopup = this.state.popups.filter(popup => popup.size === 'M');
        if (i === 'link') {
            this.setState({ docPopup: !this.state.docPopup });
        } else if (event.target.dataset.value !== 'x') {
            let popups = [...this.state.popups];
            let popup = { ...popups[i] };
            if (popup.size === 'M') {
                popup.size = 'S';
                popup.party = popup.party || this.state.party;
                popups[i] = popup;
                this.setState({ popups, docPopup: false });
            } else if (!checkPopup.length) {
                popup.size = 'M';
                popup.party = popup.party || this.state.party;
                popups[i] = popup;
            }
            this.setState({ popups, docPopup: false });
        } else {
            let popups = [...this.state.popups];
            popups.splice(i, 1);
            this.setState({ popups, docPopup: false });
        }
    }

    onChartClick(chart) {
        let checkPopup = this.state.popups.filter(popup => popup.size === 'M');
        if (chart.length > 0 && !checkPopup.length && !this.state.docPopup) {
            const party = this.state.parties[chart[0]._index];
            let popups = [...this.state.popups];
            popups.push({ size: 'M', party: party });
            this.setState({ popups, docPopup: false });
            this.setState({
                ...this.props.data.getVoteData(this.state.votering_id, party),
                party: party
            });
        }
    }

    render() {
        const {
            popups,
            docPopup,
            party,
            parties,
            date,
            title,
            active,
            dok_id,
            votering_id
        } = this.state;
        const backgroundColor = ['#0FCE56', '#FF6384', '#FFCE56', '#85a8d3'];
        let totalVoteResult = [0, 0, 0, 0];
        let voteResult = [];
        for (let i = 0; i < 4; i++) {
            voteResult.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        const data2 = {
            labels: [...parties],
            datasets: [
                {
                    label: 'Ja',
                    data: voteResult[0],
                    backgroundColor: active ? backgroundColor[0] : '#ddd'
                },
                {
                    label: 'Nej',
                    data: voteResult[1],
                    backgroundColor: active ? backgroundColor[1] : '#ddd'
                },
                {
                    label: 'Avstår',
                    data: voteResult[2],
                    backgroundColor: active ? backgroundColor[2] : '#eee'
                },
                {
                    label: 'Frånvarande',
                    data: voteResult[3],
                    backgroundColor: active ? backgroundColor[3] : '#eee'
                }
            ]
        };

        let voteRows = [];

        const { data } = this.props;
        let checkPopup = popups.filter(popup => popup.size === 'M');
        const IconTheme = this.props.UserTheme === 'light' ? 'invert(0)' : 'invert(1)';
        return (
            <Main>
                {this.props.authUser && this.props.authUser.branding
                    ? 'AFTONBLADET'
                    : null}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '900px'
                    }}
                >
                    <div>
                        {active && <InfoIcon src={InfoCircle} onClick={active && !checkPopup.length ? () => this.handlePopup('link') : undefined} style={{ display: 'block', filter: IconTheme }} />}
                    </div>
                    {active ? (
                        <DocH1>{dok_id && dok_id.substr(4)}</DocH1>
                    ) : (
                            <DocH1>Riksdagskollen</DocH1>
                        )}
                    {active && (
                        <DocText>
                            {title &&
                                title.substr(
                                    title.indexOf(dok_id.substr(4)) +
                                    dok_id.substr(4).length
                                )}{' '}
                            - {date}
                        </DocText>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: '1.5rem',
                        marginBottom: '1.5rem'
                    }}
                >
                    <Search
                        ThemeProps={this.props.UserTheme}
                        data={data}
                        handleChange={this.handleSearchChange}
                    />
                </div>

                <div style={{ display: 'flex', width: '100%' }}>
                    {data.rawData.length > 0 &&
                        data.rawData[votering_id].forEach((vote, i) => {
                            const colorIndex = data2.datasets.findIndex(
                                value => value.label === vote.rost
                            );
                            voteRows.push(
                                <Span
                                    key={i + vote.namn}
                                    title={
                                        active
                                            ? `${vote.namn} (${vote.parti}): ${vote.rost}`
                                            : null
                                    }
                                    style={{
                                        transitionDuration: '0.5s',
                                        background: active
                                            ? backgroundColor[colorIndex]
                                            : '#ddd'
                                    }}
                                />,
                                i === 18 && <br key='br' />
                            );
                        })}

                    {parties.forEach((party, id) => {
                        let voteObject = this.props.data.getVoteData(
                            votering_id,
                            party
                        );
                        voteObject.votes.forEach((vote, i) => {
                            voteResult[i][id] += vote.length;
                            totalVoteResult[i] += vote.length;
                        });
                    })}

                    {totalVoteResult.map((e, i) => {
                        return active ? (
                            <div
                                key={i + 'a'}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    transition: 'width 0.5s',
                                    boxSizing: 'border-box',
                                    width: `${(e / 349) * 1000}px`,
                                    height: '50px',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    background: backgroundColor[i],
                                    borderRight: e > 0 && '1px solid white',
                                    marginTop: '0.5rem',
                                    fontFamily: 'Roboto Condensed',
                                    fontSize: '20px',
                                    fontWeight: '500',
                                    color: 'white'
                                }}
                            >
                                {' '}
                                {/* {e >= 10 ? `${data2.datasets[i].label}:` : <br />} <br />  */}
                                {e >= 10 && `${((e / 349) * 100).toFixed(1).replace(/.0+$/, '')}%`}
                            </div>
                        ) : (
                                <div
                                    key={i + 'a'}
                                    style={{
                                        display: 'inline-flex',
                                        transition: 'width 0.5s',
                                        boxSizing: 'border-box',
                                        width: `${0.25 * 1000}px`,
                                        height: '50px',
                                        textAlign: 'center',
                                        background: '#eee',
                                        border: '1px solid white',
                                        marginTop: '0.5rem'
                                    }}
                                >
                                    <br />
                                    <br />
                                </div>
                            );
                    })}
                </div>

                <div
                    style={{
                        display: 'flex',
                        width: '1000px',
                        textAlign: 'center',
                        overflow: 'hidden',
                        cursor: active && 'pointer'
                    }}
                >
                    <div
                        style={{
                            width: '50%',
                            fontSize: '5px',
                            marginRight: '10px',
                            marginTop: '50px'
                        }}
                    >
                        {voteRows}
                        {active && (
                            <span
                                style={{
                                    display: 'inline-block',
                                    fontSize: '15px',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'italic',
                                    marginTop: '5px'
                                }}
                            >
                                {' '}
                                Ledamöternas respektive röster sorterade på
                                bänknummer
                            </span>
                        )}
                    </div>
                    <div style={{ width: '50%', marginLeft: '10px' }}>
                        <br />
                        <br />
                        {!active && <Bar data={data2} options={options1} />}
                        {active && (
                            <Bar
                                data={data2}
                                onElementsClick={this.onChartClick}
                                options={options2}
                            />
                        )}
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '94.5%',
                        marginTop: '-20px'
                    }}
                >
                    <Logos
                        style={{
                            filter: !active && 'grayscale(100%)',
                            opacity: !active && '0.5'
                        }}
                    >
                        <img src={S} alt='S' className='img' />
                        <img src={V} alt='V' className='img' />
                        <img src={C} alt='C' className='img' />
                        <img src={M} alt='M' className='img' />
                        <img src={L} alt='L' className='img' />
                        <img src={KD} alt='KD' className='img' />
                        <img src={MP} alt='MP' className='img' />
                        <img src={SD} alt='SD' className='img' />
                    </Logos>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginTop: '30px',
                        marginBottom: '30px',
                        justifyContent: 'space-between',
                        width: '1000px'
                    }}
                >
                    {active &&
                        popups.map((popup, i) => {
                            return (
                                popup.size && (
                                    <Popup
                                        theme={this.props.UserTheme}
                                        data={this.props.data}
                                        key={i}
                                        size={popup.size}
                                        clickedPopup={event =>
                                            this.handlePopup(i, event)
                                        }
                                        id={votering_id}
                                        party={popup.party || party}
                                    />
                                )
                            );
                        })}
                </div>
                {docPopup && !checkPopup.length && (
                    <DocPopup
                        clickedPopup={() => this.handlePopup('link')}
                        dok_id={dok_id}
                    />
                )}
            </Main>
        );
    }
}

export default Renderer;
