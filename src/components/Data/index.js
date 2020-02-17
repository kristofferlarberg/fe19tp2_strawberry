import React, { Component } from 'react'
import update from 'immutability-helper';
import Menu from '../Menu';



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
const infoURL = (documentID) => `http://data.riksdagen.se/dokument/${documentID}`;


export class Data extends Component {

    state = {
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

        hasData: false,

        expandedRows: []
    };

    componentDidMount() {
        for (let i = 0; i < AllDocumentID.length; i++) {
            let documentID = AllDocumentID[i];
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
                                    $set: infoURL(documentID)
                                }
                            }
                        }),
                        hasData: true,
                    })
                });
        }
    }

    render() {
        const { voteringInfo, hasData } = this.state;
        return (
            <>
                {hasData ? <Menu data={voteringInfo} /> : <p>Loading...</p>}
            </>
        )
    }
}

export default Data
