class NotesClient{
  loadNotes() {
    return fetch('http://localhost:3000/notes')
    .then((response) => {
      if (!response.ok) {
        throw new Error (`HTTP error! Status: ${response.status}`)} 
      return response.json()
    })
    .catch(error => {
      if (error instanceof TypeError) {
        throw new Error (`Server is down, client could not retrieve GET`)
      } else {
        throw error;
      }
    }) 
  }

  createNote(data) {
    return fetch('http://localhost:3000/notes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "content": data })
    }).then((response) => {
      if (!response.ok) {
        throw new Error ('Could not post data!')
      }
    })
    .catch(error => {
      if (error instanceof TypeError) {
        throw new Error (`Server is down, client could not retrieve POST`)
      } else {
        throw error;
      }
    }) 
  }

  deleteNotes() {
    return fetch('http://localhost:3000/notes', {
      method: "DELETE",
    })
    .catch(error => {
      throw new Error (`Server is down, client could not DELETE data`)
    }) 
  }
  
  loadDataMakersStyle(callback) {
    return fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        callback(data)
      });
  }

  // leTry() {
  //   return fetch('https://jsonplaceholder.typicode.com/toddos')
  //       .then(responseData => {
  //         if (!responseData.ok) {
  //           throw new Error (`HTTP error! Status: ${responseData.status}`)}
  //         else {
  //           return responseData.json()}
  //       })
  //       .then(data => console.log(data[0]))
  //       .catch(error => {
  //         if (error instanceof TypeError) {
  //           console.log('Network error, please check your internet connection')
  //         } else
  //         {console.error(error)}
  //       })
  // }
}

module.exports = NotesClient