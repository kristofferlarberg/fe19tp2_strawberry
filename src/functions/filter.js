export function getData(currentId, currentParty, data) {
	const votingData = data || JSON.parse(localStorage.getItem('votingData'));
	const votingArray = [];

	votingData.forEach(votering => {
		votering.forEach(id => {
			(!votingArray.includes(id.votering_id)) && votingArray.push(id.votering_id);
		})
	});

	let parties = [];
	let dataOut = {};
	
	votingData.forEach(votering => {
		let voting = votering.filter(id => id.votering_id === currentId);

		if (voting.length) {
			voting.map((party) => {
				return (!parties.includes(party.parti)) && parties.push(party.parti);
			});
			
			
			let members = voting.filter(member => member.parti === currentParty);
			dataOut = {
				parties,
				votingArray,
				title: voting[0].titel,
				date: voting[0].systemdatum.substring(0, 10),
				yes: members.filter(vote => vote.rost === 'Ja'),
				no: members.filter(vote => vote.rost === 'Nej'),
				pass: members.filter(vote => vote.rost === 'Avstår'),
				absent: members.filter(vote => vote.rost === 'Frånvarande')
			};
			return;
		}
	});

	return dataOut;
};