const NotesModel = require('./notesModel')
const NotesView = require('./notesView')
const NotesClient = require('./notesClient')

const notes_model = new NotesModel
const notes_client = new NotesClient
const notes_view = new NotesView(notes_model, notes_client)


// notes_view.displayNotesFromApiMakersStyle()
// notes_view.reloadNotesFromApi()

const run = async () => {
  try {
    await notes_view.reloadNotesFromApi()
    notes_view.displayNotes()
  }
  catch (err) {
    notes_view.displayError(err)
  }
}

run()