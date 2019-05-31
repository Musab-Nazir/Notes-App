/*  Auther: Musab Nazir
 *   Date: 31-May-2019
 *   Description: Main page for the notes app
 */

/ for colored text in terminal
const chalk = require('chalk')
// terminal argument parsing
const yargs = require('yargs')
// file system
const fs = require('fs')
// custom functions
const notes = require('./notes')

yargs.version('1.1.0')

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    // builder allows for the optional 'switches' of the command
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true, // title is required
            type: 'string' // needs to be a string
        },
        body: {
            describe: 'Note Body',
            demandOption: true, // body is required
            type: 'string' // needs to be a string
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes()
    }
})

// Read command
yargs.command({
    command: 'read',
    describe: 'Read an existing note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})
// parse the arguments
yargs.parse()