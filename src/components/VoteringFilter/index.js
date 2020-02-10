import React from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';

const Table = styled.table`
 border: 1px solid #000;
 padding: 20px;

 strong {
   cursor: pointer;
 }

 td {
   border-bottom: 1px solid #000;
 }
`;

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
  constructor() {
    super();

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
      ],
      expandedRows: []
    };
  }

  componentDidMount(key) {
    //loop through all strings in array AllDocumentID
    for (let i = 0; i < AllDocumentID.length; i++) {
      //create variable for all strings (ID:s)
      let documentID = AllDocumentID[i];

      //get titles and descriptions from API 
      fetch(APITitle(documentID))
        .then((data) => data.json())
        .then((data) => {
          //use variable as part of URL = creates API URL in order to get all separate titles
          const utskottsforslag = data.utskottsforslag
          this.setState({
            voteringInfo: update(this.state.voteringInfo, {
              [i]: {
                title: { $set: utskottsforslag.dokument.titel },
                description: {
                  $set: utskottsforslag.dokutskottsforslag.utskottsforslag.forslag || utskottsforslag.dokutskottsforslag.utskottsforslag[0].forslag
                }
              }
            }),
            hasData: true,
          })
        });
    }

  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(id => id !== rowId) :
      currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.id);
    const itemRows = [
      <tbody key={"row-data-" + item.id}>
        <tr onClick={clickCallback}>
          <td><strong>{item.title}</strong></td>
        </tr>
      </tbody>
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <tbody key={"row-expanded-" + item.id}>
          <tr>
            <td>{item.description}</td>
          </tr>
        </tbody>
      );
    }

    return itemRows;
  }

  render() {
    let allItemRows = [];

    this.state.voteringInfo.forEach(item => {
      const perItemRows = this.renderItem(item);
      allItemRows = allItemRows.concat(perItemRows);
    });

    return (
      <Table>{allItemRows}</Table>
    );
  }
}

export default VoteringFilter;
