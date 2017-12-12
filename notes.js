// console.log('Starting notes.js');
// console.log(module);
// console.log(process);

/**
module.exports.age = 35;

module.exports.addNote = () => {
	// console.log(`Add Note`);
	return 'New Note';
};

module.exports.add = (x,y) => {
	return x + y;
};
*/
const fs = require('fs');

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	}
	catch(e) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	var duplicateNotes = notes.filter((note) => {
		return note.title === title;
	});
	if (duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}	
}

var getNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title === title);
	return filteredNotes[0];
}

var removeNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length;
}

var getAll = (title, body) => {
	return fetchNotes();
}

var logNote = (note) => {
	//debugger;
	console.log('--');
	console.log(`Title : ${note.title}`);
	console.log(`Body : ${note.body}`);
}	

module.exports = {
	addNote,
	getNote,
	removeNote,
	getAll,
	logNote
}