const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();
const NotesClient = require('./notesClient')

describe('notes client class', () => {

  let client;

  beforeEach(() => {
    fetch.resetMocks();
    client = new NotesClient()
  })

  test('fetches information from backend', async () =>{
    fetch.mockResponseOnce(JSON.stringify({
      name: "some value",
      id: 123
    }))
    // line below checks whether result is promise or not
    const result = client.loadNotes()
    expect(result instanceof Promise).toBe(true)
    
    expect((await result).name).toEqual('some value')
  })

  test('fails to fetch information and throws a fake error', async() => {
    fetch.mockRejectedValueOnce(new Error('Async error message'));
    expect(client.loadNotes()).rejects.toThrow('Async error message')
  })

  test('fails to fetch information and throws a fake error', async() => {
    fetch.mockRejectedValueOnce(new TypeError);
    expect(client.loadNotes()).rejects.toThrow(`Server is down, client could not retrieve GET`)
  })

  test('fails to fetch information through invalid status code', async() => {
    fetch.mockResponseOnce("<main></main>", {
      status: 404,
    });;
    expect(client.loadNotes()).rejects.toThrow('HTTP error! Status: 404')
  })

  test('fails to post information through invalid status code', async() => {
    fetch.mockResponseOnce("<main></main>", {
      status: 404,
    });;
    expect(client.createNote()).rejects.toThrow('Could not post data!')
  })

  test('deletes posts in server', async() => {
    fetch.mockResponseOnce("<main></main>", {
      status: 200,
    });;

    await client.deleteNotes()

    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:3000/notes');
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: 'DELETE',
    });
  })

  test('throws error if server is down during deletion', () => {
    fetch.mockRejectedValueOnce(new Error);
    expect(client.deleteNotes()).rejects.toThrow(`Server is down, client could not DELETE data`)
  })

  test('should send a POST request with the correct payload', async () => {
    const data = 'my note';
    const expectedPayload = { content: data };

    await client.createNote(data);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:3000/notes');
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expectedPayload),
    });
  });

// Tests on makers client which utilizes a callback

  test('calls fetch and loads info using makers style', (done) => {
    fetch.mockResponseOnce(JSON.stringify({
      notes: ['something', 'something else']
    }));

    client.loadDataMakersStyle((returnedDataFromApi) => {
      expect(returnedDataFromApi.notes).toEqual(['something', 'something else']);
      done();
    });
  });

  test('using makers style and await', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      name: 'something',
      id: 124
    }));

    client.loadDataMakersStyle((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toBe('something');
      expect(returnedDataFromApi.id).toBe(124);
    });
  });
})