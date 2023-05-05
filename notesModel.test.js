const NotesModel = require('./notesModel')

describe('notes model class', () =>{

  let model;
  beforeEach(() => {
    model = new NotesModel
  })
  
  it ('initializes as an empty array', () =>{
    expect(model.getNotes()).toEqual([])
  })

  it ('adds note to the array', () =>{
    model.addNote('buy milk')
    model.addNote('go to the gym')
    expect(model.getNotes()).toEqual(['buy milk', 'go to the gym'])
  })

  it ('resets notes in the array', () =>{
    model.addNote('buy milk')
    model.addNote('go to the gym')
    expect(model.getNotes()).toEqual(['buy milk', 'go to the gym'])
    model.reset()
    expect(model.getNotes()).toEqual([])  
  })

  it ('sets the notes in the array', () =>{
    const notes = ['note1', 'note2']
    model.setNotes(notes)
    expect(model.getNotes()).toEqual(notes)
  })
})