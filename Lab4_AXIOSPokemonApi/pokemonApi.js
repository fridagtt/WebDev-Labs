let pokemonForm = document.getElementById("pokemonForm")
let totalWeight = 0

// create warnings when pokemon input is empty or when pokemon name doesn't exist.
const addWarning = (text) => {
  let warning = document.getElementById('warning')
  warning.setAttribute("class", "alert alert-warning")
  warning.appendChild(document.createTextNode(text))

  setTimeout(function(){
    warning.className += ' hidden'
    warning.innerHTML = ''
  }, 2000);
}

// add card
const addCard = (pokemonName, height, id, weight) => {
  totalWeight += parseFloat(weight) //modify total weight
  document.getElementById('totalWeight').innerHTML = parseFloat(totalWeight).toFixed(2)

  let pokemonList = document.getElementById('pokemonList')

  let newCard = document.createElement('div')
  newCard.setAttribute("class", "card col-sm-2")
  let newCardBody = document.createElement('div')
  newCardBody.setAttribute("class", "card-body")

  let img = document.createElement('img')
  img.src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png` // acces pokemon image
  img.setAttribute("class", "card-img-to")

  let h5 = document.createElement('h5')
  h5.appendChild(document.createTextNode(pokemonName))
  h5.setAttribute("class", "card-title")

  let p = document.createElement('p')
  p.appendChild(document.createTextNode(`Height: ${height} ID: ${id} `))
  p.setAttribute("class", "card-text")

  let nextP = document.createElement('p')
  nextP.appendChild(document.createTextNode(`Weight: ${weight}`))
  nextP.setAttribute("class", "card-text")

  let removeButton = document.createElement('button')
  removeButton.addEventListener('click', (e) => {
    let target = e.target.parentNode.parentNode
    totalWeight -= parseFloat(weight) //modify total weight
    document.getElementById('totalWeight').innerHTML = parseFloat(totalWeight).toFixed(2)
    pokemonList.removeChild(target)
  })

  removeButton.appendChild(document.createTextNode('Remove pokemon'))
  removeButton.setAttribute("class", "btn btn-danger btn-sm")

  newCardBody.appendChild(h5)
  newCardBody.appendChild(p)
  newCardBody.appendChild(nextP)
  newCardBody.appendChild(removeButton)
  newCard.appendChild(img)
  newCard.appendChild(newCardBody)
  newCard.style.margin = "16px"

  pokemonList.appendChild(newCard)
}

pokemonForm.onsubmit = (e) => {
  e.preventDefault()
  let pokemonName = document.getElementById('pokemonName').value
  let pokemon = pokemonName.toLowerCase()
  let url = `http://127.0.0.1:3000/PokemonApi/?name=${pokemon}`

  if (pokemon.trim() !== ''){
    let ajaxPromise = new Promise((resolve, reject) => {

      let ajaxRequest = new XMLHttpRequest()
      ajaxRequest.open("GET", url) //access Axios request

      // on request received
      ajaxRequest.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) { // 4 = DONE, 200 = OK
          resolve(this.responseText);
        } else if (this.readyState == 4 && this.status !== 200) {
          reject()
        }
      }
      ajaxRequest.send() // send request
    })

    ajaxPromise.then(response => {
      let pokemonObject = JSON.parse(response)
      addCard(pokemon, pokemonObject.height, pokemonObject.id, pokemonObject.weight)
    }).catch(() => {
      addWarning('This pokemon name is not available')
    })
  } else {
    addWarning("The pokemon name can't be empty")
  }
}
