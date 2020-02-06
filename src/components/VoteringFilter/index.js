import React from 'react';
import App from './App.js';

const APIOne = 'http://data.riksdagen.se/votering/93C09C8A-56C6-40A2-88AA-7560C19456C7/?utformat=JSON';

const VoteringFilter = {

}

class VoteringFilter extends App.Component {
  constructor() {
    this.state = {
      voteringInfo: [
        { 
          title: '',
          description: '',
          id: 1,
        },
        {
          title: '',
          description: '',
          id: 2,
        },
        {
          title: '',
          description: '',
          id: 3,
        }, {
          title: '',
          description: '',
          id: 4,
        },
        {
          title: '',
          description: '',
          id: 5,
        }, 
        {
          title: '',
          description: '',
          id: 6,
        }, 
        {
          title: '',
          description: '',
          id: 7,
        }, 
        {
          title: '',
          description: '',
          id: 8,
        },
        {
          title: '',
          description: '',
          id: 9,
        }, 
        {
          title: '',
          description: '',
          id: 10,
        }
      ]
    }
  }

  

 componentDidMount() {
   fetch(API)
     .then((data) => data.json())
     .then((data) => {
       this.setState({
         riksmote: data.voteringOne.titel,
         hasData: true
       })
       this.voteringTitle();
     });
 }

 voteringTitle() {
    const {
      voteringOne,
      voteringTwo,
      voteringThree,
      voteringFour,
      voteringFive,
      voteringSix,
      voteringSeven,
      voteringEight,
      voteringNine,
      voteringTen,
    } = this.state;

    const votering = () => filter => {
      // this.state.
    }
    
    riksmote.forEach((person) => {
      const { parti } = person;

      if (!parties[parti]) {
        parties[parti] = {
          memberCount: 0,
          votes: { "Ja": 0, "Nej": 0, "Avstår": 0, "Frånvarande": 0 }
        };
      }
      
      parties[parti].memberCount++;
      parties[parti].votes[person.rost]++;
    });

    console.log(parties);
  }
}

export default VoteringFilter;