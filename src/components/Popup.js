import React, { Component } from 'react';
import Data from './Data/index';
import styled from 'styled-components';
import { DataConsumer } from './Data/index';
import { getVoteData } from '../functions/filter';

const BoxShadow = styled.div`
  position: relative;
  box-shadow: 0px 0px 15px #aaa;
  margin: 25px;
  width: 850px;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  padding:0px;
`
const MemberList = styled.ul`
  display: inline-block;
  width: 25%;
  padding-left: 10px;
  margin: 0px;
  list-style-type: none;
`

class Popup extends React.Component {
    handleClick(event) {
        getVoteData(5);
    }

    render(props) {
        const voteObject = getVoteData(this.props.id || 0, this.props.party)
        let totalVotes = 0
        voteObject.votes.forEach(e => totalVotes += e.length)
        console.log(voteObject)
        const backgroundColor = [
            '#0FCE56',
            '#FF6384',
            '#FFCE56',
            '#85a8d3',
        ]
        const labels = [
            'Ja',
            'Nej',
            'Avstår',
            'Frånvarande',
        ]
        const parties = [
            'Socialdemokraterna (S)',
            'Vänsterpartiet (V)',
            'Centerpartiet (C)',
            'Moderata samlingspartiet (M)',
            'Liberalerna (L)',
            'Kristdemokraterna (KD)',
            'Miljöpartiet de gröna (MP)',
            'Sverigedemokraterna (SD)'
        ]
        let partyMembers = [[], [], [], []]
        return (
            <BoxShadow style={{}} onClick={this.handleClick} >
                <DataConsumer>
                    {
                        (ctx) => (
                            <>
                                <div key={'chart'} style={{
                                    height: '45px',
                                    padding: '10px',
                                    display: 'flex',
                                    borderRadius: '5px',
                                    backgroundImage: 'linear-gradient(to right, #385858, #8cb5b5)',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h1>
                                        {this.props.party === '-' ? 'Partilösa' : parties[voteObject.parties.indexOf(this.props.party)]}</h1>
                                    {!this.props.party === '-' && <img src={`img/${this.props.party}.svg`} style={{ width: '45px', height: '45px' }} />}
                                </div>
                                {
                                    voteObject.votes.map((e, i) => {
                                        return i < 4 && <div key={i + 'a'} style={{ display: 'inline-flex', alignItems: 'center', height: '60px', position: 'relative', top: '-5px', boxSizing: 'border-box', width: `${e.length / totalVotes * 850}px`, justifyContent: 'center', background: backgroundColor[i], borderTop: e.length > 0 && '2px solid white', color: 'white', fontSize: '20px' }}><span>{e.length > 0 && `${(e.length / totalVotes * 100).toFixed(1)}%`}</span></div>
                                    })
                                }
                                {
                                    voteObject.votes.forEach((e, id) => {
                                        e.forEach((member, i) => partyMembers[id].push(<li key={i} style={{ color: backgroundColor[id] }} title={member.valkrets}>{member.namn}<br /></li>))
                                        console.log(partyMembers.length)
                                    })
                                }
                                <div style={{ display: 'flex', marginBottom: '0px', width: '836px' }}>
                                    {labels.map((label, i) => <span style={{ color: backgroundColor[i], textTransform: 'uppercase', fontWeight: 'bold', display: 'inline-block', width: '25%', paddingLeft: '10px' }}>{label}</span>)}
                                </div>
                                <div style={{ height: '358px', display: 'flex', overflowY: 'scroll' }}>
                                    {partyMembers.map(members => {
                                        return <MemberList>{members}</MemberList>
                                    })
                                    }
                                </div>
                            </>
                        )
                    }
                </DataConsumer>
            </BoxShadow >
        );
    }
}

export default Popup;