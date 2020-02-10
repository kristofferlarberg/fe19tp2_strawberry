import React from 'react';

 
const API = "http://data.riksdagen.se/voteringlista/?rm=2019%2F20&bet=&punkt=&valkrets=&rost=&iid=&sz=3490&utformat=JSON&gruppering="

/**
 API Struktur:

 {
   "voteringlista": {
      "votering": {
        hangar_id,
        rm,
        beteckning,
        punkt,
        votering_id,
        intressent_id,
        namn,
        fornamn,
        efternamn,
        iort,
        parti,
        banknummer,
        kon,
        fodd,
        rost: "Ja" | "Nej" | "Avstår" | "Frånvarande",
        avser,
        votering,
        votering_url_xml,
        dok_id,
        systemdatum
      }
   }
 }

 Votering 1:  93C09C8A-56C6-40A2-88AA-7560C19456C7
 Votering 2:  C8CC9671-12AA-41CF-8C04-F07D5E082DDF
 Votering 3:  2A6E5AC7-9AD6-4F3A-BCC2-B55D818BE4C2
 Votering 4:  D3AA5539-F89A-42E1-8740-33322026FAD9
 Votering 5:  367E2382-9304-48B9-99B8-81EFF9A50D8F
 Votering 6:  3725650B-F0CB-416C-ADE0-9C2ED725B0BE
 Votering 7:  E9E6D48F-1FFE-4AFE-A9A6-752293FAB149
 Votering 8:  67766912-8897-4FC2-A807-81F954AEDF7A
 Votering 9:  181F3D9F-1AA1-4C36-8057-66A5BD5FDF33
 Votering 10: B1FFED43-30EC-41A1-A17A-23735FA39F4A
*/

class App extends React.Component {

  state = {
    riksmote: [],
    hasData: false,
    optionSelect:1,
    votering_id: '93C09C8A-56C6-40A2-88AA-7560C19456C7'
  };

  constructor(props) {
    super(props);
    this.FilterResult = this.FilterResult.bind(this)
    this.GetPartyResult = this.GetPartyResult.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this)
    this.HandleSubmit= this.HandleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(API)
    .then((data) => data.json())
    .then((data) => {
      this.setState({ riksmote: data.voteringlista.votering, hasData: true })
      console.log(this.GetPartyResult());
    });
  }

  /** 
   * @param {String} votering_list 
   */
  FilterResult(votering_list) {
   const beteckningID = votering_list;
   
   const filterVotering_id = this.state.riksmote.filter(person => person.votering_id === beteckningID)
  //   const YesResult = filterVotering_id.filter(person => person.rost === resultShortedByVotes[0]);
  //   const NoResult = filterVotering_id.filter(person => person.rost ===resultShortedByVotes[1]);
  //   const AvstarResult = filterVotering_id.filter(person => person.rost ===resultShortedByVotes[2]);
  //   const FranvarandeResult = filterVotering_id.filter(person => person.rost ===resultShortedByVotes[3]);
  //   const TotalPresent = YesResult.length + NoResult.length + AvstarResult.length;
  //  console.log('I riksdagen alla '+filterVotering_id.length+' medlemar de som är i riksdagen är '+TotalPresent+' och från de som är frånvarande är '+FranvarandeResult.length);
  //  console.log('Resultatet av votering är '+YesResult.length+' ja, '+NoResult.length+' nej och '+AvstarResult.length+' avstår');


const shortByparty = {};
const emptyObject = {}
   filterVotering_id.forEach(person => {
    const {rost} = person;
    if(!emptyObject[rost]){
      emptyObject[rost] =[]
    }
    emptyObject[rost].push(person)
   })
   const Objkeys = Object.keys(emptyObject);
   let i =0;
   const votesObj = {}
   Object.values(emptyObject).forEach(item => {
     let amoutOfVotes = 0;
     const votes = {};
     item.forEach(person => {
      const {parti} = person;
      if (!votes[parti]) {
        votes[parti]= []
      }
      amoutOfVotes++;
      votes[parti].push(person);

     });
     votesObj[Objkeys[i]] =amoutOfVotes;
    shortByparty[Objkeys[i]]=votes;
     i++;  
   });
   const shortedByVotes = {};
   let outerIndex = 0;
   Object.values(shortByparty).forEach(votes => {
     const innterArr = {}
    let lengthValue = 0;
    let innerIndex = 0;
     Object.values(votes).forEach(party => {
       lengthValue = party.length
       innterArr[Object.keys(votes)[innerIndex]] = lengthValue;
      innerIndex++;
     })
       // console.log(Object.keys(shortByparty)[outerIndex]);
       shortedByVotes[Object.keys(shortByparty)[outerIndex]]= innterArr;
        outerIndex++;
   })
   return {votesObj, shortedByVotes}
}
  onChangeOption (event) {
    this.setState({optionSelect:event.target.value})
  }

  HandleSubmit (event) {
    const voteteringsArray = [
      '93C09C8A-56C6-40A2-88AA-7560C19456C7',
      'C8CC9671-12AA-41CF-8C04-F07D5E082DDF',
      '2A6E5AC7-9AD6-4F3A-BCC2-B55D818BE4C2',
      'D3AA5539-F89A-42E1-8740-33322026FAD9',
      '367E2382-9304-48B9-99B8-81EFF9A50D8F',
      '3725650B-F0CB-416C-ADE0-9C2ED725B0BE',
      'E9E6D48F-1FFE-4AFE-A9A6-752293FAB149',
      '67766912-8897-4FC2-A807-81F954AEDF7A',
      '181F3D9F-1AA1-4C36-8057-66A5BD5FDF33',
      'B1FFED43-30EC-41A1-A17A-23735FA39F4A'
    ]
      this.setState({votering_id:voteteringsArray[this.state.optionSelect-1]})
    event.preventDefault();
  }

  GetPartyResult(index) {
    const { riksmote } = this.state; 
    const voteringar = {};
    const parties = [];

    riksmote.forEach((person) => {
      const { votering_id } = person;
      if (!voteringar[votering_id]) {
        voteringar[votering_id] = []; 
      }
      voteringar[votering_id].push(person);
    });
    
    Object.values(voteringar).forEach((votering) => {
      const party = {};
      votering.forEach((person) => {
        const { parti } = person;
  
        if (!party[parti]) {
          party[parti] = { 
            memberCount: 0, 
            votes: {"Ja": 0, "Nej": 0, "Avstår": 0, "Frånvarande": 0} 
          };
        }
        
        party[parti].memberCount++;
        party[parti].votes[person.rost]++;
      })
      parties.push(party);
      
    });

    return index ? parties[index] : parties;
  }

  render() {
    const { hasData } = this.state;
    let returnValue;
    if (hasData) {
     console.log(this.FilterResult(this.state.votering_id));
      const values = this.FilterResult(this.state.votering_id); 
      const voteKeys = Object.keys(values); 
     const voteResult = values[voteKeys[0]];
     const partyResult = values[voteKeys[1]];
     let loopKey = 0;
     returnValue = <div>
       <p>Has Data</p>
       <div id='roster'>
         <p>Votes</p>
         {Object.values(voteResult).map(values => 
    <div key={Object.values(voteResult).indexOf(values)}>
      <p>{values} {Object.keys(voteResult)[Object.values(voteResult).indexOf(values)]} Röster</p>
      </div>,
           )}
       </div>
       <div id='parti-rost'>
         <p>Votes by Party</p>
          {Object.values(partyResult).map(votes => 
            <div key={Object.values(partyResult).indexOf(votes)+' vote-id'}>
                  <h1>{Object.keys(partyResult)[Object.values(partyResult).indexOf(votes)]}</h1>
                  <div>
                    {Object.values(votes).map(party => 
                    <p key={loopKey++}>{Object.keys(votes)[Object.values(votes).indexOf(party)]}: {party}
                    </p>
                    )}
                    </div>              
            </div>
          )}
       </div>
       </div>
    } else {
      returnValue = <p>Loading...</p> 
    }
    return (
      <div>
          <form onSubmit={this.HandleSubmit}>
           <label>
             Välj votering: <select value={this.state.optionSelect} onChange={this.onChangeOption}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
             </select>
           </label>
           <input type='submit'value='Submit'></input>
          </form>
          {returnValue}
      </div>
    );
  }
}

export default App;