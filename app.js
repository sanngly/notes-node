//console.log('Starting app.');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');

const yargs = require('yargs');

const notes = require('./notes.js');

var user = os.userInfo();
// console.log(user);

var result = notes.addNote();
// console.log(`Result = ${result}`);

/**
fs.appendFile('greetings.txt', `Hello ${user.username}. Welcome to NodeJS. You are ${notes.age}.`, (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

var total = notes.add(9,-2);
console.log(`Total = ${total}`); 

console.log(_.isString(true));

console.log(_.isString('Sanjoy'));

console.log(_.uniq([2, 1, 2]));

console.log(_.uniq(['Sukdeb', 'One', 'One']));
*/

// arguments vector
// console.log(yargs.argv);
// console.log(process.argv);

const titleOptions = {
	describe: 'Title of Note',
	demand: true,
	alias: 't'
};

const bodyOptions = {
	describe: 'Body of Note',
	demand: true,
	alias: 'b'
};

const argv = yargs
.command('ADD', 'Add a New Note', {
	title: titleOptions,
	body: bodyOptions
})
.command('READ', 'Reading the Note', {
	title: titleOptions
})
.command('REMOVE', 'Removing the Note', {
	title: titleOptions
})
.command('LIST', 'listing all the Notes')
.help()
.argv;
var command = argv._[0];
//console.log('Command = ' + command);
//console.log('Yargs ' + argv);
//console.log('Process ' + process.argv);

if (command === 'ADD') {
	var note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log('Note created.');
		notes.logNote(note);
	} else {
		console.log('de note title le alreadeu use de.');
	}
}
else if (command === 'READ') {
	var note = notes.getNote(argv.title);
	if (note) {
		console.log('Note found.');
		notes.logNote(note);
	} 
	else {
		console.log('Note not found.');
	}	
} 
else if (command === 'REMOVE') {
	console.log('Note Removed.');
	console.log('--');
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : 'Note not found.'
	console.log(message);
}
else if (command === 'LIST') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => {
		notes.logNote(note);
	});
}
else {
	console.log('Command not recognized.');
}