const productsArray = [
    {
      id: "price_1McoRAKTqfPHNZ5mbSaUGU8Y",
      title: "Volta Ticket",
      price: 69.99,
      background: "https://img.freepik.com/free-vector/hand-drawn-africa-day-background_23-2149348216.jpg"
    },
    {
      id: "price_1McoRVKTqfPHNZ5mrh0KWhrF",
      title: "Nile Ticket",
      price: 139.99,
      background: "https://img.freepik.com/premium-vector/flat-africa-day-background_23-2149351446.jpg?w=2000"
    },
    {
      id: "price_1MgSkLKTqfPHNZ5m3zYpYDcs",
      title: "Congo Ticket",
      price: 199.99,
      background: "https://cdn2.vectorstock.com/i/1000x1000/61/31/tribal-african-background-vector-2016131.jpg"
    },
]

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
    console.log("Product does not exist for specific ID:" + id);
    return undefined;
    }

    return productData;
}


export { productsArray, getProductData }