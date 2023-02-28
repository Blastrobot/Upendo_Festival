const productsArray = [
    {
      id: "1",
      title: "Volta Ticket",
      price: 59.99
    },
    {
      id: "2",
      title: "Nile Ticket",
      price: 119.99
    },
    {
      id: "3",
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