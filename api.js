const fetchPokemon = (pokemon) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`)} 
    return response.json()
  })
  .then(data => 
     {return {
      name: data['name'],
      id: data['id'],
      height: data['height'],
      weight: data['weight'],
      types: data.types.map(x => x.type.name)
    };
  });
};

module.exports = fetchPokemon
// console.log(fetchPokemon('charizard'))

// fetchPokemon('charizard')
//   .then(data => console.log(data))


// .then(data => {return data})


// const mything = fetch('http://api.open-notify.org/iss-now.json?callback')
// .then(response => {console.log(response.status); return response.json()})
// .then(data => console.log(data))
