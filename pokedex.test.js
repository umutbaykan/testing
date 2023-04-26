const Pokedex = require('./pokedex')

describe ('pokedex class', () => {

  let pokedex;
  beforeEach(() => {
    pokedex = new Pokedex()
  })
  
  it ("initializes with an empty array", () => {
    expect(pokedex.all()).toEqual([])
  })

  it ('catches a pokemon', async () => {
    pokedex.catch('charizard');
    const caughtPokemon = pokedex.all();
    const pokemonInfo = await caughtPokemon[0];
    expect(caughtPokemon).toHaveLength(1);
    expect(pokemonInfo).toHaveProperty('name', 'charizard');
    expect(pokemonInfo).toHaveProperty('id', 6);
    expect(pokemonInfo).toHaveProperty('types', ['fire', 'flying']);
  })

  it ('catches another pokemon', async () => {
    pokedex.catch('charizard');
    pokedex.catch('pikachu');
    const caughtPokemon = pokedex.all();
    expect(caughtPokemon).toHaveLength(2);
    const pokemonInfo = await caughtPokemon[1];
    expect(pokemonInfo).toHaveProperty('name', 'pikachu');
    expect(pokemonInfo).toHaveProperty('types', ['electric']);
  })

  it ('challenges a pokemon 1v1', async () => {
    const pokemonInfo = await pokedex.challenge('squirtle');
    expect(pokemonInfo).toHaveProperty('name', 'squirtle');
  });

  test('challenges a pokemon 1v1', async () => {
    await expect(pokedex.challenge('squirtle'))
    .resolves.toHaveProperty('name', 'squirtle');
  });

  it("throws an error if HTTP response is not 200 OK", async () => {
    await expect(pokedex.challenge("non-existent-pokemon")).rejects.toThrow(
      "HTTP error! Status: 404"
    );
  });
})