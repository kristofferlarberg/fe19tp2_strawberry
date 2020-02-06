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
    hasData: false
  };

  constructor(props) {
    super(props);
    this.FilterResult = this.FilterResult.bind(this)
    this.GetPartyResult = this.GetPartyResult.bind(this);
  }

  componentDidMount() {
    fetch(API)
    .then((data) => data.json())
    .then((data) => {
      this.setState({ riksmote: data.voteringlista.votering, hasData: true })
      this.FilterResult();

      console.log(this.GetPartyResult());
    });
  }

  FilterResult() {
    const ResutArray = ['Ja','Nej','Avstår','Frånvarande'];
    const beteckningID = this.state.riksmote[0].votering_id;
    const filterVotering_id = this.state.riksmote.filter(person => person.votering_id === beteckningID)
    const YesResult = filterVotering_id.filter(person => person.rost === ResutArray[0]);
    const NoResult = filterVotering_id.filter(person => person.rost ===ResutArray[1]);
    const AvstarResult = filterVotering_id.filter(person => person.rost ===ResutArray[2]);
    const FranvarandeResult = filterVotering_id.filter(person => person.rost ===ResutArray[3]);

    const TotalPresent = YesResult.length + NoResult.length + AvstarResult.length;
    console.log('Antal medlemar i riksdagen är '+TotalPresent+' och från de som är frånvarande är '+FranvarandeResult.length);
    console.log('Resultatet av votering är '+YesResult.length+' ja, '+NoResult.length+' nej och '+AvstarResult.length+' avstår');
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

    return (
      <div>
      </div>
    );
  }
}

export default App;