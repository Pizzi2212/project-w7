const cart = JSON.parse(localStorage.getItem('cart')) || []

const cartList = document.getElementById('cartList')
const totalPriceElement = document.getElementById('totalPrice')

function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const total = cart.reduce(
    (sum, product) => sum + parseFloat(product.price),
    0
  )
  totalPriceElement.textContent = `Total Price: €${total.toFixed(2)}`
}
if (cart.length === 0) {
  cartList.innerHTML = '<p>Your cart is empty.</p>'
  totalPriceElement.textContent = 'Total Price: €0.00'
} else {
  cart.forEach((product) => {
    const productCardHTML = `
      <div class="col col-sm-6 col-lg-3">
        <div class="card mb-2">
          <img src="${product.imageUrl}" class="card-img-top object-fit-contain mt-2" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>€${product.price}</strong></p>
            <button class="btn btn-outline-danger removeButton">Remove</button>
          </div>
        </div>
      </div>
    `
    cartList.innerHTML += productCardHTML
  })
}
calculateTotal()
cartList.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeButton')) {
    const card = event.target.closest('.card')
    const productTitle = card.querySelector('.card-title').textContent
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    const updatedCart = cart.filter((product) => product.title !== productTitle)
    localStorage.setItem('cart', JSON.stringify(updatedCart))

    card.parentElement.remove()

    if (updatedCart.length === 0) {
      cartList.innerHTML = '<p>Your cart is empty.</p>'
    }
    calculateTotal()
  }
})
