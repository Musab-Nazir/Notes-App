/*  Auther: Musab Nazir
 *   Date: 31-May-2019
 *   Description: Collection of functions used by the notes app
 */
const fs = require('fs')
const chalk = require('chalk')

function listNotes() {
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(chalk.blue.bold(element.title))
    })
}
// Loads in any existing notes and appends to that file
// checks if any existing titles exist before appending
const addNote = (title, body) => {
    const notes = loadNotes()
    const dupelicateNote = notes.find((existingNote) =>
        existingNote.title === title)

    if (!dupelicateNote) {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green('Note added'))
    } else {
        console.log(chalk.red('Duplicate title'))
    }

    saveNotes(notes)
}
// Loads in any existing notes and saves only those that dont match
// the provided title
const removeNote = (title) => {
    const notes = loadNotes()
    keepers = notes.filter((existingNote) => existingNote.title != title)
    if (keepers.length == notes.length) {
        console.log(chalk.red('No Note titled: ' + title + ' found'))
    } else {
        saveNotes(keepers)
        console.log(chalk.green('Note titled: ' + title + ' removed'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()

    // look for the particular titled note
    const dupelicateNote = notes.find((existingNote) =>
        existingNote.title === title)

    if (dupelicateNote) {
        console.log(chalk.blue.underline(dupelicateNote.title))
        console.log(chalk.green(dupelicateNote.body))
    } else {
        console.log(chalk.red('No note found'))
    }
}

// IO FUNCTIONS
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}