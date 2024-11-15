const year = document.getElementById('current-year')
year.innerText = new Date().getFullYear()

const apiKey = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDBkNDhhZDEyOTAwMTU4NzZiYjMiLCJpYXQiOjE3MzE2NTc5NDEsImV4cCI6MTczMjg2NzU0MX0.29uJvuf0zrgFOMQ8vWRPQRLMTuxnGO-BoI-Y6LaK3Xk',
  'Content-Type': 'application/json',
}

function generateProductCards(products) {
  const list = document.getElementById('list')
  list.innerHTML = ''

  products.forEach((product) => {
    const productCardHTML = `
          <div class="col col-sm-6 col-lg-3">
            <div class="card mb-2">
              <a href="details.html?id=${product._id}">
                <img src="${product.imageUrl}" class="card-img-top object-fit-contain mt-2" alt="${product.name}">
              </a>
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>€${product.price}</strong></p>
                <button id="buttonMod" onclick="edit('${product._id}')" class="btn btn-outline-primary">Mod</button> 
    <button  class="btn btn-outline-success buttonBuy">Buy</button 
       </div>
  </div>
  </div>
        `
    list.innerHTML = list.innerHTML + productCardHTML
  })
}
document.querySelector('#list').addEventListener('click', (event) => {
  if (event.target.classList.contains('buttonBuy')) {
    const card = event.target.closest('.card')

    const product = {
      imageUrl: card.querySelector('.card-img-top').src,
      title: card.querySelector('.card-title').textContent,
      description: card.querySelector('.card-text').textContent,
      price: card.querySelector('strong').textContent.replace('€', ''),
    }
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log('Product added to cart:', product)
  }
})

function fetchProducts() {
  fetch('https://striveschool-api.herokuapp.com/api/product/', {
    method: 'GET',
    headers: apiKey,
  })
    .then((response) => response.json())
    .then((products) => {
      generateProductCards(products)
    })
    .catch((error) => {
      console.log('Error')
    })
}

function edit(Id) {
  window.location.href = `back-office.html?id=${Id}`
}

window.onload = fetchProducts()

window.addEventListener('scroll', (e) => {
  const navbar = document.getElementById('headNav')
  const scrollP = 300
  if (scrollY > scrollP) {
    navbar.classList.add('modScroll')
  } else {
    navbar.classList.remove('modScroll')
  }
})
