/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");
const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();

describe('NotesView', () => {
  
  let model;
  
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    fetch.resetMocks();
    model = new NotesModel();
  })

  test('displays the notes in the html as part of a div with a class of note', () => {
    const view = new NotesView(model);
    model.addNote('walk the dog')
    model.addNote('wash the dishes')
    view.displayNotes()
    const divs = document.querySelectorAll('div.note')
    expect(divs.length).toEqual(2)
    expect(divs[0].outerHTML).toEqual('<div class="note">walk the dog</div>')
  })

  test('adds a note to the list', () => {
    const view = new NotesView(model);
    const form = document.querySelector('#user-input')
    form.value = 'hello bud'

    const add_button = document.querySelector('#add-text')
    add_button.click()

    const divs = document.querySelectorAll('div.note')
    expect(divs.length).toEqual(1)
    expect(divs[0].outerHTML).toEqual('<div class="note">hello bud</div>')
  })


  test('removes all notes from the list', () => {
    const view = new NotesView(model);
    const form = document.querySelector('#user-input')
    form.value = 'hello bud'

    const add_button = document.querySelector('#add-text')
    add_button.click()

    form.value = 'hello bro'
    add_button.click()

    view.resetNotes()

    const divs = document.querySelectorAll('div.note')
    expect(divs.length).toEqual(0)
  })

  test('sets the notes through the API', async () => {
    const mockClient = {
      loadNotes: jest.fn()
    }
    mockClient.loadNotes.mockResolvedValueOnce(
      ["some note", "some other note"]);
    const view = new NotesView(model, mockClient)
    await view.reloadNotesFromApi()
    view.displayNotes()
    const divs = document.querySelectorAll('div.note')
    
    expect(mockClient.loadNotes.mock.calls.length).toEqual(1);
    expect(divs.length).toEqual(2)
    expect(divs[0].innerHTML).toEqual('some note')
    expect(divs[1].innerHTML).toEqual('some other note')
  })
  
  test('adds another note to the server', async () => {
    const mockClient = {
      createNote: jest.fn()
    }
    mockClient.createNote.mockReturnValueOnce({ status: 204 });
    const view = new NotesView(model, mockClient)
    const form = document.querySelector('#user-input')
    
    form.value = 'anyhting but default value'
    await view.createNote()
  
    expect(mockClient.createNote.mock.calls.length).toEqual(1);
    expect(form.value).toEqual('')
    expect(mockClient.createNote.mock.results[0].value.status).toEqual(204);
  })

  test('invokes the cb function of the makers stlye load', async() => {
    const mockClient = {
      loadDataMakersStyle: jest.fn()
    }
    mockClient.loadDataMakersStyle.mockImplementation(cb => {
      cb(["here are some notes", "and more"]);
    });
    const view = new NotesView(model, mockClient)
    await view.displayNotesFromApiMakersStyle()
    expect(model.getNotes()).toEqual(["here are some notes", "and more"])
  })

  test('deletes all notes on server', async() => {
    const mockClient = {
      deleteNotes: jest.fn(),
      loadNotes: jest.fn()
    }
    mockClient.deleteNotes.mockReturnValueOnce({ status: 200 });
    mockClient.loadNotes.mockResolvedValueOnce(["notes here", "and here"])
    mockClient.loadNotes.mockResolvedValueOnce([])

    const view = new NotesView(model, mockClient)
    await view.reloadNotesFromApi()
    view.displayNotes()

    expect(mockClient.loadNotes.mock.calls.length).toEqual(1);
    const divs = document.querySelectorAll('div.note')
    expect(divs.length).toEqual(2)
    expect(divs[0].innerHTML).toEqual('notes here')
    expect(divs[1].innerHTML).toEqual('and here')

    await view.resetDataInServer()
    expect(mockClient.deleteNotes.mock.calls.length).toEqual(1);
    await view.reloadNotesFromApi()
    view.displayNotes()
    expect(document.querySelectorAll('div.note').length).toEqual(0)  
  })

  test('deletes all notes on server through the button', async() => {
    const mockClient = {
      deleteNotes: jest.fn(),
      loadNotes: jest.fn()
    }
    mockClient.deleteNotes.mockReturnValueOnce({ status: 200 });
    mockClient.loadNotes.mockResolvedValueOnce(["notes here", "and here"])
    mockClient.loadNotes.mockResolvedValueOnce([])

    const view = new NotesView(model, mockClient)
    await view.reloadNotesFromApi()
    view.displayNotes()
    expect(mockClient.loadNotes.mock.calls.length).toEqual(1);
    const divs = document.querySelectorAll('div.note')
    expect(divs.length).toEqual(2)
    expect(divs[0].innerHTML).toEqual('notes here')
    expect(divs[1].innerHTML).toEqual('and here')
    
    const button = document.querySelector('#reset-api')
    await button.click()
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(document.querySelectorAll('div.note').length).toEqual(0)  
    expect(mockClient.deleteNotes.mock.calls.length).toEqual(1);
    
    await view.reloadNotesFromApi()
    view.displayNotes()

    expect(mockClient.loadNotes.mock.calls.length).toEqual(2);
    expect(document.querySelectorAll('div.note').length).toEqual(0)  
  })

  test('adds a note on the server using the buttons', async () => {
    const mockClient = {
      createNote: jest.fn(),
      loadNotes: jest.fn()
    }
    const form_value_to_enter = 'hello bud' 
    mockClient.createNote.mockReturnValue({ status: 204 }); 
    mockClient.loadNotes.mockResolvedValue(
      ["some note", "some other note", form_value_to_enter]); 

    const view = new NotesView(model, mockClient)
    const form = document.querySelector('#user-input')
    form.value = form_value_to_enter 
    const button = document.querySelector('#create-text')
    
    await button.click()
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockClient.createNote.mock.calls.length).toEqual(1); 
    expect(form.value).toEqual('') 
    expect(mockClient.createNote.mock.results[0].value.status).toEqual(204); 
    expect(mockClient.loadNotes.mock.calls.length).toEqual(1); 
    const divs = document.querySelectorAll('div.note')
    expect(divs.length).toEqual(3)
    expect(divs[0].innerHTML).toEqual('some note')
    expect(divs[2].innerHTML).toEqual('hello bud')
  })
})