'use strict';

// App Module: the name AngularStore matches the ng-app attribute
// in the main <html> tag. The route provides parses the URL and
// injects the appropriate partial page
var storeApp = angular.module('AngularStore', ['categoryFilter','featuredFilter','productFilter','categoryNameFilter','getImageUrlFilter','getProductIDFilter']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/store', { 
      templateUrl: 'ecommerce/application1988/views/main/templates/index.html',
      controller: storeController }).
	when('/storelink', { 
      templateUrl: 'ecommerce/application1988/views/main/templates/store.html',
      controller: storeController }).
	when('/category/:categoryID', {
      templateUrl: 'ecommerce/application1988/views/main/templates/category.html',
      controller: storeController }).
	when('/product/:productID', {
      templateUrl: 'ecommerce/application1988/views/main/templates/product.html',
      controller: storeController }).
    when('/cart', { 
      templateUrl: 'ecommerce/application1988/views/main/templates/shoppingCart.html',
      controller: storeController }).
	when('/checkout', { 
      templateUrl: 'ecommerce/application1988/views/main/templates/checkout.html',
      controller: storeController }).
	when('/thankyou', { 
      templateUrl: 'ecommerce/application1988/views/main/templates/thankyou.html',
      controller: storeController }).
    otherwise({
      redirectTo: '/store' });
}]);




// create a data service that provides a store and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
storeApp.factory("DataService", function ($http) {

    // create store
    var myStore = new store($http);

    // create shopping cart
	//the return Url when a transaction is complete
	var returnUrl = "http://www.phatmaxdesigns/index.php?/shopping#/thankyou";
    var myCart = new shoppingCart("Phat Max Designs",returnUrl);

    // enable PayPal checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with PayPal, you have to create a merchant account with 
    // PayPal. You can do that here:
    // https://www.paypal.com/webapps/mpp/merchant
    myCart.addCheckoutParameters("PayPal", "phat.max777@gmail.com");
	/*phat.max777@gmail.com*/
    // enable Google Wallet checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with Google Wallet, you have to create a merchant account with 
    // Google. You can do that here:
    // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
    myCart.addCheckoutParameters("Google", "500640663394527",
        {
            ship_method_name_1: "UPS Next Day Air",
            ship_method_price_1: "20.00",
            ship_method_currency_1: "USD",
            ship_method_name_2: "UPS Ground",
            ship_method_price_2: "15.00",
            ship_method_currency_2: "USD"
        }
    );

    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart
    };
});

angular.module('categoryFilter',[]).filter('categories', function(){
    return function(products, categoryID){
        var arrayToReturn = [];        
        for (var i = 0; i < products.length; i++) {
			var addCategory = false;
			if(products[i].categories)
				for (var j = 0; j < products[i].categories.length; j++) 
					if(products[i].categories[j].id == categoryID)
						addCategory=true;
			if(addCategory)
				arrayToReturn.push(products[i]);
	  	}
		return arrayToReturn;
    };
});


angular.module('featuredFilter',[]).filter('featured', function(){
    return function(products){
        var arrayToReturn = [];        
        for (var i = 0; i < products.length; i++){
			if(products[i].featured == 1)
				arrayToReturn.push(products[i]);	
		}
		return arrayToReturn;
    };
});

angular.module('productFilter',[]).filter('getProduct', function(){
    return function(products, productID){
		var arrayToReturn = [];        
        for (var i in products) {
			if (products[i].id == productID){
				arrayToReturn.push(products[i]);
				return arrayToReturn;
			}
		}
    };
});
angular.module('categoryNameFilter', [])
.filter('getCategoryName', function () {
	return function (categoryID,categories) {
		for(var i in categories){
			if(categoryID==categories[i].id)
				return categories[i].name;
		}
		return null;
	}
 });
 angular.module('getImageUrlFilter', [])
.filter('getImageUrl', function () {
	return function (input,products) {
		for(var i in products){
			if(input==products[i].sku)
				return products[i].imageUrl;
		}
		return null;
	}
 });
 angular.module('getProductIDFilter', [])
.filter('getProductID', function () {
	return function (input,products) {
		for(var i in products){
			if(input==products[i].sku)
				return products[i].id;;
		}
		return null;
	}
 });
