// product class
function product(id,sku, name, description, price, categories, imageUrl, featured) {
  this.id = id;
  this.sku = sku; // product code (SKU = stock keeping unit)
  this.name = name;
  this.description = description;
  this.price = price;
  this.categories = categories;
  this.imageUrl = imageUrl;
  this.featured = featured;
}

//category class
function category(id,name, description) {
  this.id = id;
  this.name = name;
  this.description = description;
}