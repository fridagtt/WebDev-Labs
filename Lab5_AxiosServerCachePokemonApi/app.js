const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const axios = require('axios').default

// Store fetched info on map to avoid calling API several times
let pokemonCache = new Map()

// avoid CORS error
app.use(cors());

// acces main page
app.get('/', (req, res) => {
  res.sendFile("index.html", {root: './'})
})

app.get('/style.css', (req, res) => {
  res.sendFile("style.css", {root: './'})
})

app.get('/pokemonApi.js', (req, res) => {
  res.sendFile("pokemonApi.js", {root: './'})
})

// acces pokemon api
app.get('/PokemonApi', (req,res) => {
  let pokemonName = req.query.name

  if(pokemonCache.has(pokemonName)) { // if alreay on server storage don't fetch on API
    let pokemon = pokemonCache.get(pokemonName)
    res.status(200).send({ name: pokemonName, weight: pokemon.weight, id: pokemon.id, height: pokemon.height })
  } else { // fetch using API and update server storage
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

    axios.get(url).then((response) => {
      let pokemon_data = response.data
      pokemonCache.set(pokemon_data.name, {weight: pokemon_data.weight, id: pokemon_data.id, height: pokemon_data.height })
      res.status(200).send({ name: pokemon_data.name, weight: pokemon_data.weight, id: pokemon_data.id, height: pokemon_data.height })
    }).catch ((error) => {
      res.status(404).send()
    })
  }
})

app.listen(port, () => {
  console.log('server running')
})
