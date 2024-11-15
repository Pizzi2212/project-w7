const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDBkNDhhZDEyOTAwMTU4NzZiYjMiLCJpYXQiOjE3MzE2NTc5NDEsImV4cCI6MTczMjg2NzU0MX0.29uJvuf0zrgFOMQ8vWRPQRLMTuxnGO-BoI-Y6LaK3Xk',
  'Content-Type': 'application/json',
}

const productId = new URLSearchParams(window.location.search).get('id')

fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
  method: 'GET',
  headers: headers,
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('detail').innerHTML = `
    <h1>${data.name}</h1>
    <p>${data.description}</p>
    <p><strong>Brand:</strong> ${data.brand}</p>
    <p><strong>Price:</strong> ${data.price}€</p>
    <img src="${data.imageUrl}" alt="${data.name}" width="300px">
  `
  })
  .catch((error) => console.log('Errore, impossibile caricare il prodotto'))
