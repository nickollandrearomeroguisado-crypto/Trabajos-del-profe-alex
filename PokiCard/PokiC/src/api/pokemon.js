export async function getPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
}

export async function getPokemonHeight(number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const data = await response.json();
    return data.height/10;
}

export async function getPokemonWeight(number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const data = await response.json();
    return data.weight;
}

export async function getPokemonById(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data.id; 
}

// export async function getPokemonWeaknesses(number) {
//     const response = await fetch(`https://pokeapi.co/api/v2/type/${number}`);
//     const data = await response.json();
//     const weaknesses = data.damage_relations.double_damage_from.map(type => type.name);
//     return weaknesses;
// }

export async function getPokemonWeaknesses(typeNames) {
  const results = await Promise.all(
    typeNames.map(async (name) => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${name}`);
      const data = await response.json();
      return data.damage_relations.double_damage_from.map(t => t.name);
    })
  );
  return [...new Set(results.flat())];   // junta y elimina repetidos
}