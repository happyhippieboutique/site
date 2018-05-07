var Client = ShopifyBuy;

const client = Client.buildClient({
  domain: 'ashtonblooclothing.myshopify.com',
  storefrontAccessToken: '54698c4c37d13cfe1ffed8f3d7943294'
});

function updateVariantInfo() {

    client.product.fetch(productId).then((product) => {
        var sizes = product.options.find(x => x.name === "Size")
        if (typeof sizes != "undefined") {
            // TODO: Support multiple options with options object
            var selectedSize = document.getElementById("product-size").value;
            var variant = product.variants.find(x => (x.selectedOptions[0].name === "Size" && x.selectedOptions[0].value === selectedSize));
            if (typeof variant != "undefined") {

                // set available if variant.available = true product-isavailable
                if (variant.available) {
                    document.getElementById("product-isavailable").innerHTML = "Yes";
                }
                
                // set price to variant.price product-price
                document.getElementById("product-price").innerHTML = variant.price;
            }
        }
    });
}

// Fetch all products in your shop
client.product.fetchAll().then((products) => {
    // Do something with the products
    console.log(products);
});

var url = new URL(window.location.href)

// Fetch a single product by ID
const productId = window.btoa("gid://shopify/Product/" + url.searchParams.get("product")); //625662492731

if (window.location.href.indexOf('product-detail.html') != -1) {
    client.product.fetch(productId).then((product) => {
        console.log(product);
        
        document.getElementById("product-title").innerHTML = product.title;
        document.getElementById("description-short").innerHTML = product.descriptionHtml;
        document.getElementById("product-picture-1").src = product.images[0].src;
        document.getElementById("product-picture-1-thumb").src = product.images[0].src;

        var sizes = product.options.find(x => x.name === "Size")
        if (typeof sizes != "undefined") {
            var select = document.getElementById("product-size");
            sizes.values.forEach(function(e) {
                var size = document.createElement("option");
                size.text = e.value;
                size.value = e.value;
                select.add(size);
            });
            updateVariantInfo();
            select.onchange = updateVariantInfo;
        } // else do without variant
    });
}