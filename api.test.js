const fetchPokemon = require('./api.js')

describe ('fetchpokemon method', () => {
  it('returns a promise of the useful pokemon data', (done) => {
    fetchPokemon('charizard')
      .then((pokemon) => {
        expect(pokemon.name).toEqual('charizard');
        expect(pokemon.id).toEqual(6);
        expect(pokemon.height).toEqual(17);
        expect(pokemon.types).toEqual(['fire', 'flying'])
        done();
      });
  });

  it('does the same, but with an async request', async() => {
    const pokemon = await fetchPokemon('charizard');
    expect(pokemon.name).toEqual('charizard');
    expect(pokemon.id).toEqual(6);
    expect(pokemon.types).toEqual(['fire', 'flying']);
  });
});
