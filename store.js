// store (contains the products)
function store($http) {
  	obj = [];
	categories = [];
  	$http.get('index.php?/main/getProducts').success(function(data) {	
		for (var i = 0, len = data.length; i < len; ++i) {
			 var p = data[i];
			 obj.push(new product(p.id,p.sku,p.name,p.description,p.price,p.categories,p.imageUrl,p.featured));
		 }
	});
	$http.get('index.php?/main/getCategories').success(function(data) {	
		for (var i = 0, len = data.length; i < len; ++i) {
			 var p = data[i];
			 categories.push(new category(p.id,p.name,p.description));
		 }		
	});
	this.products = obj;
	this.categories = categories;
}

store.prototype.getProduct = function (id) {
	for (var i = 0; i < this.products.length; i++) {
		if (this.products[i].id == id)
			return this.products[i];
	}
  	return null;
}

store.prototype.getProductFromCategory = function (sku) {
  for (var i = 0; i < this.products.length; i++) {
    if (this.products[i].sku == sku)
      return this.products[i];
  }
  return null;
}