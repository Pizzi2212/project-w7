const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDBkNDhhZDEyOTAwMTU4NzZiYjMiLCJpYXQiOjE3MzE2NTc5NDEsImV4cCI6MTczMjg2NzU0MX0.29uJvuf0zrgFOMQ8vWRPQRLMTuxnGO-BoI-Y6LaK3Xk',
  'Content-Type': 'application/json',
}

const productId = new URLSearchParams(window.location.search).get('id')
if (productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('name').value = data.name
      document.getElementById('description').value = data.description
      document.getElementById('brand').value = data.brand
      document.getElementById('price').value = data.price
      document.getElementById('imageUrl').value = data.imageUrl
    })
    .catch((error) => console.error('Errore:', error))
}

let productForm = document.getElementById('product-form')
productForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const product = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    brand: document.getElementById('brand').value,
    price: document.getElementById('price').value,
    imageUrl: document.getElementById('imageUrl').value,
  }

  const whatMethod = productId ? 'PUT' : 'POST'
  const url = productId
    ? `https://striveschool-api.herokuapp.com/api/product/${productId}`
    : 'https://striveschool-api.herokuapp.com/api/product/'

  fetch(url, {
    method: whatMethod,
    headers: headers,
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      alert('Prodcut save')
      window.location.href = 'index.html'
    })
    .catch((error) => console.error('Error:', error))
})

document
  .getElementById('delete-product')
  .addEventListener('click', function () {
    if (productId) {
      const deleteModal = new bootstrap.Modal(
        document.getElementById('deleteModal')
      )
      deleteModal.show()
    }
  })

document.getElementById('confirmDelete').addEventListener('click', function () {
  if (productId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: 'DELETE',
      headers: headers,
    })
      .then(() => {
        alert('Product deleted')
        window.location.href = 'index.html'
      })
      .catch((error) => console.error('Error:', error))
    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById('deleteModal')
    )
    deleteModal.hide()
  }
})

document.getElementById('resetbtn').addEventListener('click', function (e) {
  e.preventDefault()
  const resetModal = new bootstrap.Modal(document.getElementById('resetModal'))
  resetModal.show()
})

document.getElementById('confirmReset').addEventListener('click', function () {
  const productForm = document.getElementById('product-form')
  productForm.reset()
  const resetModal = bootstrap.Modal.getInstance(
    document.getElementById('Modal')
  )
  resetModal.hide()
})
