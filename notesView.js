class NotesView {
  constructor(model, client) {
    this.model = model
    this.client = client
    this.mainContainerEl = document.querySelector('#main-container');
    this.inputEl = document.querySelector('#user-input')
    
    // line below if you want to add a key response
    // this.inputEl.addEventListener('keydown', (event) => {
    //   if (event.key === 'Enter') {
    //     event.preventDefault(); // prevent the default form submission behavior
    //     this.addNote();
    //     this.displayNotes()
    //   }
    // })

    this.addButtonEl = document.querySelector('#add-text')
    this.addButtonEl.addEventListener('click', () => {
      this.addNote();
      this.displayNotes();
    });
    this.resetButtonEl = document.querySelector('#reset-text')
    this.resetButtonEl.addEventListener('click', () => {
      this.resetNotes();
    })

    this.apiResetButtonEl = document.querySelector('#reset-api')
    this.apiResetButtonEl.addEventListener('click', async () => {
      try { 
        await this.resetDataInServer();
        this.resetNotes()
      }
      catch (err) {
        this.displayError(err)
      }
    })

    this.apiButtonEl = document.querySelector('#create-text')
    this.apiButtonEl.addEventListener('click', async () => {
      try { 
        await this.createNote();
        await this.reloadNotesFromApi();
        this.displayNotes();
      }
      catch (err) {
        this.displayError(err)
      }
    })
  }

  displayNotes() {
    this.resetNotes()
    const all_notes = this.model.getNotes()
    all_notes.forEach(note => {
      const new_row = document.createElement('div')
      new_row.className = 'note'
      new_row.textContent = note
      this.mainContainerEl.append(new_row)
    })
  }
  displayError(error) {
    this.resetNotes()
    const new_row = document.createElement('div')
    new_row.className = 'red'
    new_row.textContent = error
    this.mainContainerEl.append(new_row)
  }

  resetNotes() {
    const all_notes = document.querySelectorAll('div.note, div.red')
    all_notes.forEach(note => note.remove())
  }

  addNote() {
    this.model.addNote(this.inputEl.value)
    this.inputEl.value = ""
  }

  resetDataInServer = async () => {
    await this.client.deleteNotes()
  }

  reloadNotesFromApi = async () => {
    const result = await this.client.loadNotes()
    this.model.setNotes(result)
  }

  async createNote() {
    if (this.inputEl.value === "") {return}
    await this.client.createNote(this.inputEl.value)
    this.inputEl.value = ""
  }

  async displayNotesFromApiMakersStyle() {
    await this.client.loadDataMakersStyle(this.model.setNotes)
    // this.displayNotes()
  }
}

module.exports = NotesView

