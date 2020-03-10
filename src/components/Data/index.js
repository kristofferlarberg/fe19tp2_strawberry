import React, { Component, createContext } from 'react';

const votingArray = [];
let parties = [];
const allTitles = [];
const allDates = [];
const cached_voteData = {}

let _counter = 0;


const date = ((days = 0) => {
    let today = new Date();
    today.setDate(today.getDate() - days);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
})

let bet = []
let votingData = JSON.parse(localStorage.getItem('votingData'));
const API_QUERY = `http://data.riksdagen.se/dokumentlista/?sok=&doktyp=votering&rm=&sz=50&from=${date(14)}&tom=${date()}&ts=&bet=&tempbet=&nr=&org=&iid=&webbtv=&talare=&exakt=&planering=&sort=datum&sortorder=desc&rapport=&utformat=json&a=s#soktraff`

const DataContext = createContext(null);

export default class Data extends Component {

    state = {};

    constructor() {
        super();
        this.rawData = [];
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (!votingData) {
            votingData = []

            fetch(API_QUERY)
                .then((data) => data.json())
                .then((data) => {
                    let beteckning = data.dokumentlista.dokument
                    let titles = []
                    beteckning.map(item => {
                        return (!bet.includes(item.beteckning)) ? bet.push(item.beteckning) && titles.push(item.titel) : null;
                    });
                    for (let i = 0; i < bet.length; i++) {
                        fetch(`http://data.riksdagen.se/voteringlista/?rm=2019%2F20&bet=${bet[i]}&punkt=&valkrets=&rost=&iid=&sz=349&utformat=JSON&gruppering=`)
                            .then((data) => data.json())
                            .then((data) => {
                                data.voteringlista.votering[0].titel = titles[i]
                                votingData.push(data.voteringlista.votering);
                                localStorage.setItem('votingData', JSON.stringify(votingData));
                                this.rawData = votingData;
                                _counter++;
                                this.setState({ _update: true })
                            });
                    }
                });
        } else {
            this.rawData = JSON.parse(localStorage.getItem('votingData'));
            this.setState({ hasData: true })
        };
    }

    getVoteData(currentId, currentParty) {

        if (cached_voteData[`${currentId}_${currentParty}`]) {
            return cached_voteData[`${currentId}_${currentParty}`]
        }

        const votingData = this.rawData || JSON.parse(localStorage.getItem('votingData'));

        if (!votingArray.length) {
            if (votingData) {
                votingData.forEach(votering => {
                    votering.forEach(id => {
                        (!votingArray.includes(id.votering_id)) && votingArray.push(id.votering_id);
                        ((id.titel && !allTitles.includes(id.titel))) && allTitles.push(id.titel.substr(31, id.titel.length));
                        ((id.systemdatum && !allDates.includes(id.systemdatum))) && allDates.push(id.systemdatum);
                    })
                });
            }
        }

        let titleDateArray = allTitles.map((title, index) => {
            return { title, date: allDates[index] }
        })

        let dataOut = {};
        let voting = votingData && votingData[currentId]

        if (voting && voting.length) {

            if (!parties.length) {
                voting.map((party) => {
                    return (!parties.includes(party.parti)) && parties.push(party.parti);
                });
            }


            let members = voting.filter(member => member.parti === currentParty);
            const votes = {
                "Ja": [],
                "Nej": [],
                "Avstår": [],
                "Frånvarande": []
            };

            members.forEach(member => {
                votes[member.rost].push(member);
            });

            const yes = votes['Ja'];
            const no = votes['Nej'];
            const pass = votes['Avstår'];
            const absent = votes['Frånvarande'];

            dataOut = {
                parties,
                votingArray,
                dok_id: voting[0].dok_id,
                title: voting[0].titel,
                dates: allDates,
                date: voting[0].systemdatum.substring(0, 10),
                titleDates: titleDateArray,
                yes,
                no,
                pass,
                absent,
                votes: [yes, no, pass, absent]
            };
            cached_voteData[`${currentId}_${currentParty}`] = dataOut;
        }

        return dataOut;
    };


    render() {
        if (this.state._update && _counter === bet.length) {
            this.setState({ hasData: true, _update: false });
        }

        return (
            <DataContext.Provider value={this}>
                {this.state.hasData ?
                    <DataContext.Consumer>
                        {
                            (data) => (
                                React.Children.map(this.props.children, (Child) => React.cloneElement(Child, { ...Child.props, data: this }))
                            )
                        }
                    </DataContext.Consumer>
                    : <p style={{ marginLeft: '340px' }}>Loading...</p>}
            </DataContext.Provider>
        )
    }
}

export const withData = Component => props => (
    <DataContext.Consumer>
        {data => <Component {...props} data={data} />}
    </DataContext.Consumer>
);

export { DataContext }
