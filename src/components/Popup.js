import React, { Component } from 'react';
import styled from 'styled-components';
import '../App';
import EyeIcon from './icons/eye-solid.svg';

const Xspan = styled.span`
    color: red;
    cursor: pointer;
    text-align: right;
`;
const mediumPopup = {
    position: 'absolute',
    top: '22%',
    boxShadow: '0px 0px 15px #aaa',
    width: '850px',
    height: '500px',
    borderRadius: '10px',
    overflow: 'hidden',
    padding: '0px',
    background: 'white',
    zIndex: '1',
    transitionDuration: '0.3s'
};
const smallPopup = {
    display: 'inline-block',
    width: '49%',
    height: '300px',
    borderRadius: '5px',
    border: '1px solid grey',
    overflow: 'hidden',
    padding: '0px',
    background: 'white',
    marginTop: '10px',
    marginBottom: '10px',
    transitionDuration: '0.3s',
    cursor: 'pointer'
};

class Popup extends Component {
    render() {
        const voteObject = this.props.data.getVoteData(
            this.props.id || 0,
            this.props.party
        );
        let totalVotes = 0;
        voteObject.votes.forEach(e => (totalVotes += e.length));
        const backgroundColor = ['#0FCE56', '#FF6384', '#FFCE56', '#85a8d3'];
        const labels = ['Ja', 'Nej', 'Avstår', 'Frånvarande'];
        const parties = [
            'Socialdemokraterna',
            'Vänsterpartiet (V)',
            'Centerpartiet (C)',
            'Moderata samlingspartiet (M)',
            'Liberalerna (L)',
            'Kristdemokraterna (KD)',
            'Miljöpartiet de gröna (MP)',
            'Sverigedemokraterna (SD)'
        ];
        let partyMembers = [[], [], [], []];
        const small = this.props.size === 'S' ? true : false;
        return (
            <div
                key={this.props.party}
                style={small ? smallPopup : mediumPopup}
                onClick={small ? this.props.clickedPopup : undefined}
            >
                <div
                    key={'chart'}
                    style={{
                        height: '8%',
                        padding: '4%',
                        display: 'flex',
                        borderRadius: '5px 5px 0 0',
                        /* backgroundImage: 'linear-gradient(to right, #385858, #8cb5b5)', */
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    {this.props.party !== '-' && (
                        <img
                            alt=''
                            src={`img/${this.props.party}.svg`}
                            style={{ width: small ? '40px' : '80px' }}
                        />
                    )}
                    <h1
                        style={{
                            fontFamily: 'Roboto',
                            fontWeight: '400',
                            fontSize: small ? '1.5em' : '2.5em',
                            color: 'black'
                        }}
                    >
                        {this.props.party === '-'
                            ? 'Partilösa'
                            : parties[
                                  voteObject.parties.indexOf(this.props.party)
                              ]}
                        &nbsp;
                        {!small && (
                            <img
                                alt=''
                                style={{ height: '25px', cursor: 'pointer' }}
                                onClick={this.props.clickedPopup}
                                src={EyeIcon}
                            />
                        )}
                        <Xspan onClick={this.props.clickedPopup} data-value='x'>
                            {' '}
                            ×
                        </Xspan>
                    </h1>
                </div>
                {voteObject.votes.map((e, i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                display: 'inline-flex',
                                transitionDuration: '0.3s',
                                alignItems: 'center',
                                height: e.length > 0 && '12%',
                                boxSizing: 'border-box',
                                width: `${(e.length / totalVotes) * 100}%`,
                                justifyContent: 'center',
                                background: backgroundColor[i],
                                borderTop: e.length > 0 && '2px solid white',
                                borderRight:
                                    (i === 0 &&
                                        e.length > 0 &&
                                        e.length / totalVotes !== 1 &&
                                        '2px solid white') ||
                                    (e.length / totalVotes > 0.5 &&
                                        e.length / totalVotes !== 1 &&
                                        '2px solid white'),
                                color: 'white',
                                fontSize: small ? '1em' : '1.5em'
                            }}
                        >
                            <span>
                                {e.length > 0 &&
                                    `${((e.length / totalVotes) * 100).toFixed(
                                        1
                                    )}%`}
                            </span>
                        </div>
                    );
                })}
                {voteObject.votes.forEach((e, id) => {
                    e.forEach((member, i) =>
                        partyMembers[id].push(
                            <li
                                key={i}
                                style={{ color: '#707070' }}
                                title={member.valkrets}
                            >
                                {member.namn}
                                <br />
                            </li>
                        )
                    );
                })}
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: '1rem',
                            marginBottom: '0.5rem',
                            marginLeft: '4%',
                            width: '94%'
                        }}
                    >
                        {labels.map((label, i) => (
                            <span
                                key={i}
                                style={{
                                    color: backgroundColor[i],
                                    fontFamily: 'Roboto',
                                    fontSize: small ? '1em' : '1.4em',
                                    fontWeight: '400',
                                    display: 'inline-block',
                                    width: '25%'
                                }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                    <div
                        style={{
                            height: small ? '150px' : '270px',
                            display: 'flex',
                            overflowY: 'scroll',
                            fontFamily: 'Roboto',
                            fontSize: small ? '0.6em' : '1em',
                            fontWeight: '400',
                            lineHeight: small ? '1.1em' : '1.5em',
                            width: '96%',
                            marginLeft: '4%'
                        }}
                    >
                        {partyMembers.map((members, i) => {
                            return (
                                <ul
                                    key={i}
                                    style={{
                                        width: '25%',
                                        padding: '0px',
                                        margin: '0'
                                    }}
                                >
                                    {members}
                                </ul>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
