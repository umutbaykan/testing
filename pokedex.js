const fetchPokemon = require('./api.js')

class Pokedex{
  constructor() {
    this.caught = []
  }

  all() {
    return this.caught
  }

  catch(pokemon) {
    this.caught.push(fetchPokemon(pokemon))
  }

  challenge(pokemon) {
    return fetchPokemon(pokemon)
  }
  
}

module.exports = Pokedex