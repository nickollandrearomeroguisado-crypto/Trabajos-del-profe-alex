<script setup>
import { ref, onMounted } from 'vue'
import { getPokemon, getPokemonHeight, getPokemonWeight, getPokemonById, getPokemonWeaknesses } from "../api/pokemon.js";

// export default {
//   data() {
//     return {
//       imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXcXbv9weIO1Scb5vGfHyhd8KhjE2dWqM6LyrJxphOmQ&s=10' // O una ruta local en /public
//     }
//   }
// }

// const titulopokemon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXcXbv9weIO1Scb5vGfHyhd8KhjE2dWqM6LyrJxphOmQ&s=10"
let pokemon = ref({})
let altura = ref(0)
let peso = ref(0)
let pokemonId = ref([])
let weaknesses = ref([])

getPokemon('ditto').then((data) => {
    pokemon.value = data
})

onMounted(async () => { 
  pokemon.value = await getPokemon("mankey") 
  altura.value = await getPokemonHeight("mankey")
  peso.value = await getPokemonWeight("mankey")
  pokemonId.value = await getPokemonById("mankey")
//   weaknesses.value = await getPokemonWeaknesses("mankey") 
//debilidades de pokemon
const tipos = pokemon.value.types.map(t => t.type.name)
weaknesses.value = await getPokemonWeaknesses(tipos)
  console.log(pokemon.value) 
  console.log(altura.value)
  console.log(peso.value)
  console.log(pokemonId.value)
  console.log(weaknesses.value)
})

</script>

<template>
    <h1>Pokémon</h1>
    <!-- <h1 class="titulo-pokemon">{{ imagePath }}</h1>
    <img :src="imagePath" alt="Imagen de ejemplo" /> -->
    <h2>{{ pokemon?.name }}</h2>
    <p>Altura: {{ altura }} m</p>
    <p>Peso: {{ peso }} kg</p>
    <p># {{ pokemonId }}</p>

    <img :src="pokemon?.sprites.other.home.front_default" :alt="pokemon?.name" width="500" />

    <h2>Tipos del Pokemon</h2>
    <li v-for="type in pokemon?.types" :key="type.slot">
        {{ type.type.name }}
    </li>

    <h2>Debilidades de Pokemon</h2>
    <p v-for="weakness in weaknesses" :key="weakness">
        {{ weakness }}
    </p>


    <h2>Estadísticas</h2>
    <p v-for="stat in pokemon?.stats" :key="stat.stat.name">
        {{ stat.stat.name }}: {{ stat.base_stat }}
    </p>
</template>

<style lang="css">
.titulo-pokemon {
  text-transform: capitalize;
}
</style>