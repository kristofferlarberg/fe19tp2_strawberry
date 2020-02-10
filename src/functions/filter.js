/** 
 * @param {String} votering_list 
 */
export const FilterResult = (riksmote, votering_list) => {
  const ResutArray = ['Ja', 'Nej', 'Avstår', 'Frånvarande'];
  const beteckningID = votering_list;
  const filterVotering_id = riksmote.filter(person => person.votering_id === beteckningID)
  const YesResult = filterVotering_id.filter(person => person.rost === ResutArray[0]);
  const NoResult = filterVotering_id.filter(person => person.rost === ResutArray[1]);
  const AvstarResult = filterVotering_id.filter(person => person.rost === ResutArray[2]);
  const FranvarandeResult = filterVotering_id.filter(person => person.rost === ResutArray[3]);

  const TotalPresent = YesResult.length + NoResult.length + AvstarResult.length;

  const shortByparty = {};
  const emptyObject = {}
  filterVotering_id.forEach(person => {
    const {
      rost
    } = person;
    if (!emptyObject[rost]) {
      emptyObject[rost] = []
    }
    emptyObject[rost].push(person)
  })
  const Objkeys = Object.keys(emptyObject);
  let i = 0;
  const votesObj = {}
  Object.values(emptyObject).forEach(item => {
    let amoutOfVotes = 0;
    const votes = {};
    item.forEach(person => {
      const {
        parti
      } = person;
      if (!votes[parti]) {
        votes[parti] = []
      }
      amoutOfVotes++;
      votes[parti].push(person);

    });
    votesObj[Objkeys[i]] = amoutOfVotes;
    shortByparty[Objkeys[i]] = votes;
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
    shortedByVotes[Object.keys(shortByparty)[outerIndex]] = innterArr;
    outerIndex++;
  })
  return {
    votesObj,
    shortedByVotes
  }

}




export const FilterPartyResult = (riksmote, index) => {
  const voteringar = {};
  const parties = [];

  riksmote.forEach((person) => {
    const {
      dok_id,
      votering_id
    } = person;
    if (!voteringar[votering_id]) {
      voteringar[votering_id] = [];
    }
    voteringar[votering_id].push(person);
  });

  Object.values(voteringar).forEach((votering) => {
    const party = {};
    votering.forEach((person) => {
      const {
        parti
      } = person;

      if (!party[parti]) {
        party[parti] = {
          memberCount: 0,
          votes: {
            "Ja": 0,
            "Nej": 0,
            "Avstår": 0,
            "Frånvarande": 0
          }
        };
      }

      party[parti].memberCount++;
      party[parti].votes[person.rost]++;
    })
    parties.push(party);
  });
}