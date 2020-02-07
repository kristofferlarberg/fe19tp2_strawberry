import React from 'react';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import Votering from '../Votering'


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


const APITitle = (documentID) => `http://data.riksdagen.se/utskottsforslag/${documentID}/?utformat=JSON`;


class VoteringFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indexToShow: null,
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

/*   onChange(event) {
    
    console.log(event.target.value);
    console.log(this.state.voteringInfo[event.target.selectedIndex]);
  } */

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

    chooseVotering = (id) => {
      this.setState({
        indexToShow: id,
      })
    }

 

      
   /*          console.log(event.target.value);
      console.log(this.state.voteringInfo[event.target.selectedIndex]);)
 */
    

  render() {
    const { voteringInfo } = this.state;
    return (
<main>
        <table>
          <thead>
          <tr>
            <th colspan="2"><h1>Voteringslistan</h1></th>
          </tr>
          </thead>
          <tbody>
            {voteringInfo.map(item => 
              <tr onClick={ () => this.chooseVotering(item.id) } key={item.id}><td>{item.title}</td></tr>
              )
            }
          </tbody>
        </table>
        { this.state.indexToShow ? <Votering index={this.state.indexToShow} voteringInfo={voteringInfo} /> : null }
      </main>
      
    );
  }
}


export default VoteringFilter;


   

