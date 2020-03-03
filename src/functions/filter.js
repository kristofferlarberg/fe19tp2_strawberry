const votingArray = [];
let parties = [];
const allTitles = [];
const allDates = [];

const cached_voteData = {}

export function getVoteData(currentId, currentParty, data) {

	if (cached_voteData[`${currentId}_${currentParty}`]) {
		return cached_voteData[`${currentId}_${currentParty}`]
	}

	const votingData = data || JSON.parse(localStorage.getItem('votingData'));

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
	}

	cached_voteData[`${currentId}_${currentParty}`] = dataOut;

	return dataOut;
};