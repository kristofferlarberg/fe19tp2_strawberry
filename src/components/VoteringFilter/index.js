import React from 'react';
import update from 'immutability-helper';


//Ändra till dok_id
const AllDocumentID = [
  'H701AU1',
  'H701AU2',
  'H701AU4',
  'H701AU5',
  'H701AU6',
  'H701CU1',
  'H701CU2',
]



const APITitle = (documentID) => {
  return `http://data.riksdagen.se/utskottsforslag/${documentID}/?utformat=JSON`;
}  

class VoteringFilter extends React.Component {
  constructor(props) {
    super(props)
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
      ]
    }
  }


  componentDidMount(key) {
    //loop through all strings in array AllDocumentID
    for (let i = 0; i < 10; i++) {
      //create variable for all strings (ID:s)
      let documentID = AllDocumentID[i];
      
      //get titles and descriptions from API 
      fetch(APITitle(documentID)) 
        .then((data) => data.json())
        .then((data) => {
          //use variable as part of URL = creates API URL in order to get all separate titles
          const utskottsforslag = data.utskottsforslag
          this.setState({
            voteringInfo: update(this.state.voteringInfo, { [i]: { 
              title: { $set: utskottsforslag.dokument.titel }, 
              description: { 
                $set: utskottsforslag.dokutskottsforslag.utskottsforslag.forslag || utskottsforslag.dokutskottsforslag.utskottsforslag[0].forslag 
              } 
            } }),
            hasData: true,
          })
        });
    }

  }



  render() {

    return (
      <div>
        <p>Hello all the politically interested!</p>
      </div>
    );

  }


}

export default VoteringFilter;