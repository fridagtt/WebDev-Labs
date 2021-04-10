const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const axios = require('axios').default

// avoud CORS error
app.use(cors());

// acces pokemon api
app.get('/PokemonApi', (req,res) => {
  let pokemonName = req.query.name
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

  axios.get(url).then((response) => {
    let pokemon_data = response.data
    res.status(200).send({ name: pokemon_data.name, weight: pokemon_data.weight, id: pokemon_data.id, height: pokemon_data.height })
  }).catch ((error) => {
    res.status(404).send()
  })
})

app.listen(port, () => {
  console.log('server running')
})
