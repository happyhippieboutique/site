


const client = ShopifyBuy.buildClient({
  domain: 'ashtonblooclothing.myshopify.com',
  storefrontAccessToken: '54698c4c37d13cfe1ffed8f3d7943294'
});

var url = new URL(window.location.href)



// Fetch a single product by ID

if (window.location.href.indexOf('product-detail.html') != -1) {
    const productId = window.btoa("gid://shopify/Product/" + url.searchParams.get("product")); //625662492731
    client.product.fetch(productId).then((product) => {
        
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

function updateVariantInfo() {
    const productId = window.btoa("gid://shopify/Product/" + url.searchParams.get("product"));
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



if (window.location.href.indexOf('products.html') != -1) {
    document.getElementsByClassName('btnGallery is-checked')[0].classList.remove('is-checked');
    if (url.searchParams.get("collection")) {
        var id = "collection" + url.searchParams.get("collection");
    } else {
        var id = "collectionAll";
    }
    document.getElementById(id).classList.add('is-checked');

    // list all collections
    
    // if "collection" in url
    if (url.searchParams.get("collection")) {
        const collectionId = window.btoa("gid://shopify/Collection/" + url.searchParams.get("collection")); //36392834523
        client.collection.fetchWithProducts(collectionId).then((collection) => {
            printProducts(collection.products);
        });
        // show all products
        //
    } else {
        client.product.fetchAll().then((products) => {
            printProducts(products);
        });
    }
}
function printProducts(products) {
    var list = document.getElementById('productList');
    var productTemplate = `
        <div class="col-md-4 col-sm-6 col-xs-12 element-item">
            <div class="flex">
                <div class="productsWrapper_Img">
                    <a href="product-detail.html?product={{productId}}">
                        <img class="responsive" src="{{productImage}}" alt="">
                    </a>
                </div>
                <div class="empty-space marg-sm-b20 marg-lg-b30"></div>
                <div class="productsWrapper_text">
                    <div class="simple-text small">
                        <a href="product-detail.html?product={{productId}}" class="title-style">{{productName}}</a>
                    </div>
                </div>

                <div class="empty-space marg-sm-b20 marg-lg-b30"></div>
                <div class="productsWrapper_price">
                    <div class="price">
                        <span>&dollar;{{productPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
    `
    products.forEach(function(p) {
        
        console.log(p);
        product = document.createElement('div');
        product.classList.add('productsWrapper', 'center');
        product.innerHTML = productTemplate
            .replace('{{productId}}', window.atob(p.id).replace('gid://shopify/Product/',''))
            .replace('{{productName}}', p.title)
            .replace('{{productImage}}', p.images[0].src)
            .replace('{{productPrice}}', p.variants[0].price)
            ; //
        list.appendChild(product);
    });
}