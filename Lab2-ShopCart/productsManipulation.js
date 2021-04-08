let products = []

const addToList = (productName, productPrice) => {
  let cartList = document.getElementById('cartList')

  let newItem = document.createElement('li')
  let innerspan = document.createElement('span')
  innerspan.className = 'productLabel'
  innerspan.appendChild(document.createTextNode(productName))
  newItem.appendChild(innerspan)

  let newButton = document.createElement('button')
  newButton.addEventListener('click', (e) => {
    let item = e.target.parentNode
    cartList.removeChild(item)
    removeItem(innerspan.innerHTML)
  })
  newButton.className = 'removeButton button'

  newButton.appendChild(document.createTextNode('Remove item'))
  newItem.appendChild(newButton)
  newItem.className = 'itemContainer'
  cartList.appendChild(newItem)
}

const addProduct = (productName, productPrice) => {
  if (productName === '' || productPrice === '') alert("Product name and price can't be empty. Please fill them up.")
  
  else if (isNaN(productPrice)) alert("Price must be a number.")

  else {
    products.push({name: productName, cost: productPrice})
    document.getElementById("productName").value = ""
    document.getElementById("productPrice").value = ""
    addToList(productName,productPrice)
    totalPrice()
  }
}

const totalPrice = () => {
  let totalPrice = 0.00
  products.map( product => {
    totalPrice += parseFloat(product.cost)
  })
  document.getElementById('totalAmount').innerHTML = '$ ' + parseFloat(totalPrice).toFixed(2)
}

const removeItem = (productName) => {
  products = products.filter(product => product.name !== productName)
  totalPrice()
}