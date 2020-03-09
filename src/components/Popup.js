import React, { Component } from 'react';
import { withData } from './Data/index';
import styled from 'styled-components';
import '../App';

const BoxShadow = styled.div`
  position: relative;
  top:-350px;
  /* left: -100px; */
  box-shadow: 0px 0px 15px #aaa;
  /* margin: 25px; */
  width: 850px;
  height: 550px;
  border-radius: 10px;
  /* border-bottom:5px solid #e93f34;  */
  overflow: hidden;
  padding:0px;
  background: white;
  z-index:1;
`

class Popup extends React.Component {

    render(props) {
        const voteObject = this.props.data.getVoteData(this.props.id || 0, this.props.party);
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
            'Socialdemokraterna',
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
                <div key={'chart'} style={{
                    height: '60px',
                    padding: '30px',
                    display: 'flex',
                    borderRadius: '5px 5px 0 0',
                    /* background: '#e93f34', */
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
                    {this.props.party !== '-' && <img src={`img/${this.props.party}.svg`} style={{ width: '55px', height: '55px', marginTop: '5px',marginRight: '10px' }} />}
                    <h1 style={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: '1.8em', color: 'black' }}>{this.props.party === '-' ? 'Partilösa' : parties[voteObject.parties.indexOf(this.props.party)]}</h1>
                    </div>

                </div>
                {
                    voteObject.votes.map((e, i) => {
                        return <div key={i} style={{ display: 'inline-flex', alignItems: 'center', height: '50px', boxSizing: 'border-box', width: `${e.length / totalVotes * 850}px`, justifyContent: 'center', background: backgroundColor[i], borderTop: e.length > 0 && '2px solid white', borderRight: i === 0 && e.length > 0 && (e.length / totalVotes) !== 1 && '2px solid white' || (e.length / totalVotes) > 0.5 && (e.length / totalVotes) !== 1 && '2px solid white', color: 'white', fontFamily: 'Roboto Condensed', fontSize: '20px', fontWeight:'500' }}><span>{e.length > 0 && `${(e.length / totalVotes * 100).toFixed(1)}%`}</span></div>
                    })
                }
                {
                    voteObject.votes.forEach((e, id) => {
                        e.forEach((member, i) => partyMembers[id].push(<li key={i} style={{ color: '#707070' }} title={member.valkrets}>{member.namn}<br /></li>))
                    })
                }
                <div >
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3rem', marginBottom: '1.5rem', marginLeft: '4%', width: '94%' }}>
                        {labels.map((label, i) => <span style={{ color: backgroundColor[i], fontFamily: 'Roboto', fontSize: '1.4em', fontWeight: '400', display: 'inline-block', width: '25%' }}>{label}</span>)}
                    </div>
                    <div style={{ height: '294px', display: 'flex', overflowY: 'scroll', fontFamily: 'Roboto', fontSize: '1em', fontWeight: '400', lineHeight: '1.5em', width: '96%', marginLeft: '4%' }}>
                        {partyMembers.map((members, i) => {
                            return <ul style={{ width: '25%', padding: '0px', margin: '0' }}>{members}</ul>
                        })
                        }
                    </div>
                </div>
            </BoxShadow >
        );
    }
}

export default withData(Popup);