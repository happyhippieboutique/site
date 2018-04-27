var Client = ShopifyBuy;

const client = Client.buildClient({
  domain: 'ashtonblooclothing.myshopify.com',
  storefrontAccessToken: '54698c4c37d13cfe1ffed8f3d7943294'
});


// Fetch all products in your shop
client.product.fetchAll().then((products) => {
    // Do something with the products
    console.log(products);
});

// Fetch a single product by ID
const productId = window.btoa("gid://shopify/Product/625662492731");


client.product.fetch(productId).then((product) => {
    // Do something with the product
    document.getElementById("product-title").innerHTML = product.title;
    console.log(product.title);
    console.log(product.description);
});