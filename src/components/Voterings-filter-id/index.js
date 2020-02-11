import React, { Component } from 'react';
import { FilterResult} from '../../functions/filter.js'

import { Doughnut } from 'react-chartjs-2'

const API = 'http://data.riksdagen.se/voteringlista/?rm=2019%2F20&bet=&punkt=&valkrets=&rost=&iid=&sz=3490&utformat=JSON&gruppering='

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

 const AllDocumentID = [
  'H701AU1',
  'H701AU2',
  'H701AU4',
  'H701AU5',
  'H701AU6',
  'H701CU1',
  'H701CU2',
]

const APITitles = (documentID) => `http://data.riksdagen.se/utskottsforslag/${documentID}/?utformat=JSON`;

const getChartData = (votes) => {
    const out = {
        labels: Object.keys(votes),
        datasets: [
            {
                data: Object.values(votes),
                backgroundColor: []
            }
        ]
    }

    for (let i = 0; i < out.labels.length; i++) {
        out.datasets[0].backgroundColor.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    }

    return out;
}

export default class Filter_vote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
            optionSelect: 0,
            votering_id: '93C09C8A-56C6-40A2-88AA-7560C19456C7',
            voteTitle : []
        }
        this.onChangeOption = this.onChangeOption.bind(this)
        this.HandleSubmit = this.HandleSubmit.bind(this)
         this.fetchTitles = this.fetchTitles.bind(this);
    }
    componentDidMount() { 
        this.fetchTitles(AllDocumentID)
        fetch(API)
            .then((data) => data.json())
            .then((data) => {
                this.setState({ riksmote: data.voteringlista.votering, hasData: true })
            });
           
    }
     fetchTitles (DocumentIDArray) {
         const titlePush = []
         for (let index = 0; index < DocumentIDArray.length; index++) {
             let documentID = DocumentIDArray[index]
             fetch(APITitles(documentID)).then((data) => data.json())         
            .then((data) => titlePush.push(data.utskottsforslag.dokument.titel))
        } 
         this.setState({voteTitle: titlePush})
         }
     

    onChangeOption(event) {        
        this.setState({ optionSelect: event.target.value, votering_id: voteteringsArray[event.target.value] })
    }

    HandleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const { hasData, riksmote, votering_id, optionSelect } = this.state;
        let returnValue;
        let selectForm;
        if (hasData) {
            const values = FilterResult(riksmote, votering_id);
            const voteKeys = Object.keys(values);
            const voteResult = values[voteKeys[0]];
            const partyResult = values[voteKeys[1]];        
            selectForm = <select value={optionSelect} onChange={this.onChangeOption}>
                {this.state.voteTitle.map((title, index) => 
                    <option key={index} value={index}>{title}</option>
                    )}         
        </select>
            returnValue = <div>
                <div id='roster'>
                    <p>Votes</p>
                    <Doughnut data={getChartData(voteResult)} options={{ events: ['click'] }} />
                    {Object.values(voteResult).map((values,index) =>
                        <div key={index}>
                            <p>{values} {Object.keys(voteResult)[index]} Röster</p>
                        </div>,
                    )}
                </div>

                <div id='parti-rost'>
                    <p>Votes by Party</p>
                    {Object.values(partyResult).map((votes,index) =>
                        <div key={index}>
                            <h2>{Object.keys(partyResult)[index]}</h2>
                            <Doughnut data={getChartData(votes)} />
                        </div>
                    )}
                </div>
            </div>
        } else {
            returnValue = <p>Loading...</p>
            selectForm = null;
        }
        return (
            <div>
                <form onSubmit={this.HandleSubmit}>
                    <label>
                        Välj votering: {selectForm}
                    </label>
                </form>
                {returnValue}
            </div>
        );
    }
}