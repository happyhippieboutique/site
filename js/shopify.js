(function(window) {


    function Shopify(key) {
        this.store = ShopifyBuy.buildClient(key);
        this.url = new URL(window.location.href);
        this.href = window.location.href;
    }

    Shopify.prototype.getProductId = function() {
        return window.btoa("gid://shopify/Product/" + this.url.searchParams.get("product"));
    }

    Shopify.prototype.getCollectionId = function() {
        return window.btoa("gid://shopify/Collection/" + this.url.searchParams.get("collection"))
    }

    Shopify.prototype.getVariant = function(products, options) {
        
    }

    shopify.store.collection.fetchWithProducts(collectionId).then((collection) => {
        printProducts(collection.products);
    });

    function variantLookup(v) {
        var match = true;
        options.forEach(function(o) {
            match = match && v.selectedOptions.find(so => so.name === o.name).value === o.selected; 
        });
        return match;
    }


    
    var key = {
        domain: 'ashtonblooclothing.myshopify.com',
        storefrontAccessToken: '54698c4c37d13cfe1ffed8f3d7943294'
    };

    window.shopify = new Shopify(key);
})(window);

console.log(shopify);

// Fetch a single product by ID

if (shopify.href.indexOf('product-detail.html') != -1) {
    shopify.store.product.fetch(shopify.getProductId()).then((product) => {
        console.log(product);
        
        document.getElementById("product-title").innerHTML = product.title;
        document.getElementById("description-short").innerHTML = product.descriptionHtml;
        document.getElementById("product-picture-1").src = product.images[0].src;
        document.getElementById("product-picture-1-thumb").src = product.images[0].src;

        /*
        p.variants = [
            {
                title: "XS / 2018",
                price: "28.00",
                selectedOptions: [
                    { name: "Size", value: "XS"},
                    { name: "Year", value: "2018"},
                ]
            },
        ];
        */

        var options = [];
        product.variants[0].selectedOptions.forEach(function (so) {
            var values = product.options.find(o => o.name === so.name).values;
            options.push({
                name: so.name,
                selected: so.value,
                values: values,
            });
        });

        options.forEach(function(o) {
            optionsSetup(o);
        })

        function variantLookup(v) {
            var match = true;
            options.forEach(function(o) {
                match = match && v.selectedOptions.find(so => so.name === o.name).value === o.selected; 
            });
            return match;
        }

        if (product.variants.filter(variantLookup)[0].available) {
            document.getElementById("product-isavailable").innerHTML = "Yes";
        }
        document.getElementById("product-price").innerHTML = product.variants.filter(variantLookup)[0].price;

    });
}

function optionsSetup(option) {
    if (typeof option != "undefined") {
        var selectContainer = document.getElementById("product-container-" + option.name.toLowerCase()).hidden = false;
        var select = document.getElementById("product-" + option.name.toLowerCase());
        option.values.forEach(function(v) {
            var e = document.createElement("option");
            e.text = v.value;
            e.value = v.value;
            select.add(e);
        });
        select.value = option.default;
        select.onchange = optionsUpdate;
    }
}

function optionsUpdate(e) {
    console.log(e.target.id);
}



if (shopify.href.indexOf('products.html') != -1) {
    document.getElementsByClassName('btnGallery is-checked')[0].classList.remove('is-checked');
    if (shopify.url.searchParams.get("collection")) {
        var id = "collection" + shopify.url.searchParams.get("collection");
    } else {
        var id = "collectionAll";
    }
    document.getElementById(id).classList.add('is-checked');

    // list all collections
    
    // if "collection" in url
    if (shopify.url.searchParams.get("collection")) {
        const collectionId = shopify.getCollectionId(); //36392834523
        shopify.store.collection.fetchWithProducts(collectionId).then((collection) => {
            printProducts(collection.products);
        });
        // show all products
        //
    } else {
        shopify.store.product.fetchAll().then((products) => {
            printProducts(products);
        });
    }
}
function printProducts(products) {
    var list = document.getElementById('productList');
    var productTemplate = `
        <div class="col-md-3 col-sm-6 col-xs-12 grid-item">
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