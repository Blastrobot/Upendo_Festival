const productsArray = [
    {
      id: "price_1McoRAKTqfPHNZ5mbSaUGU8Y",
      title: "Volta Ticket",
      price: 69.99
    },
    {
      id: "price_1McoRVKTqfPHNZ5mrh0KWhrF",
      title: "Nile Ticket",
      price: 139.99
    },
    {
      id: "price_1MgSkLKTqfPHNZ5m3zYpYDcs",
      title: "Congo Ticket",
      price: 199.99
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