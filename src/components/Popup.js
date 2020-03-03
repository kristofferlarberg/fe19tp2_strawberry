import React, { Component } from 'react';
import Data from './Data/index';
import styled from 'styled-components';
import { DataConsumer } from './Data/index';
import { getVoteData } from '../functions/filter';
import '../App';

const BoxShadow = styled.div`
  position: relative;
  top:-350px;
  /* left: -100px; */
  box-shadow: 0px 0px 15px #aaa;
  /* margin: 25px; */
  width: 1000px;
  height: 650px;
  border-radius: 10px;
  overflow: hidden;
  padding:0px;
  background: white;
  z-index:1;
`

class Popup extends React.Component {

    render(props) {
        const voteObject = getVoteData(this.props.id || 0, this.props.party)
        let totalVotes = 0
        voteObject.votes.forEach(e => totalVotes += e.length)
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
            <BoxShadow style={{}} onClick={this.props.handleClick} >
                <DataConsumer>
                    {
                        (ctx) => (
                            <>
                                <div key={'chart'} style={{
                                    height: '40px',
                                    padding: '30px',
                                    display: 'flex',
                                    borderRadius: '5px 5px 0 0',
                                    /* backgroundImage: 'linear-gradient(to right, #385858, #8cb5b5)', */
                                    color: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {/* <h1>{this.props.party === '-' ? 'Partilösa' : parties[voteObject.parties.indexOf(this.props.party)]}</h1> */}
                                    {this.props.party !== '-' && <img src={`img/${this.props.party}.svg`} style={{ width: '55px', height: '55px' }} />}
                                </div>
                                {
                                    voteObject.votes.map((e, i) => {
                                        return <div key={i} style={{ display: 'inline-flex', alignItems: 'center', height: '50px', boxSizing: 'border-box', width: `${e.length / totalVotes * 1000}px`, justifyContent: 'center', background: backgroundColor[i], borderTop: e.length > 0 && '2px solid white', borderRight: i === 0 && e.length > 0 && (e.length / totalVotes) !== 1 && '2px solid white' || (e.length / totalVotes) > 0.5 && (e.length / totalVotes) !== 1 && '2px solid white', color: 'white', fontSize: '20px' }}><span>{e.length > 0 && `${(e.length / totalVotes * 100).toFixed(1)}%`}</span></div>
                                    })
                                }
                                {
                                    voteObject.votes.forEach((e, id) => {
                                        e.forEach((member, i) => partyMembers[id].push(<li key={i} style={{ color: '#707070' }} title={member.valkrets}>{member.namn}<br /></li>))
                                    })
                                }
                                <div style={{padding: '30px'}}>
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px', marginTop: '20px', width: '100%' }}>
                                    {labels.map((label, i) => <span style={{ color: backgroundColor[i], fontFamily: 'Roboto', fontSize: '1.4em', fontWeight: '400', display: 'inline-block'}}>{label}</span>)}
                                </div>
                                    <div style={{ height: '349px', display: 'flex', overflowY: 'scroll', fontFamily: 'Roboto', fontSize: '1em', fontWeight: '400', lineHeight: '1.8em'}}>
                                    {partyMembers.map(members => {
                                        return <ul style={{width:'25%'}}>{members}</ul>
                                    })
                                    }
                                </div>
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