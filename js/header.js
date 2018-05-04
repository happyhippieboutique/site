(function() {
    var header = `
        <a href="/" id="logo"><img src="img/main-logo-01.png" alt=""></a>
        <div class="header-content">
            <nav class="nav">
                <ul class="nav-list">
                    <!-- add class 'active' to highlight current link -->
                    <!-- after li/a element, add ul with class 'sub-menu' with child li/a elements to create a drop down -->
                    <li class="nav-list-item"><a href="/" class="nav-item-link active">Home</a></li>
                    <li class="nav-list-item"><a href="about.html" class="nav-item-link">About us</a></li>
                    <li class="nav-list-item sub-menu-item">
                        <a href="#" class="nav-item-link">Shop<i class="fa fa-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li><a href="products1.html">Ladies</a></li>
                            <li><a href="products2.html">Men's</a></li>
                            <li><a href="products3.html">Kids</a></li>
                            <li><a href="products4.html">Accessories</a></li>
                        </ul>
                    </li>
                    <li class="nav-list-item"><a href="contacts1.html" class="nav-item-link">Contact</a></li>
                </ul>
            </nav>
            <a href="cart.html" class="busket">
                <img src="img/busket.png" alt="">
                <span class="busket-amount">1</span>
                <span class="busket-price">
                    total: <i>149.95$</i>
                </span>
            </a>
            <div class="sign-up">
                <a href="#" class="open-popup" data-rel="1">Log in</a>
                <span> / </span>
                <a href="#" class="open-popup" data-rel="2">Sign up</a>
            </div>
        </div>
        <div class="menu-mobile-wrap">
            <div class="menu-mobile">
                <span></span>
            </div>
        </div>
        `
    document.getElementById('header').innerHTML = header;
})();
