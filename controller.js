function storeController($scope, $routeParams, DataService) {

  // get store and cart from service
  $scope.categories = allData;
  $scope.store = DataService.store;
  $scope.cart = DataService.cart;

  // use routing to pick the selected product
  if ($routeParams.productID != null) {
    	//$scope.product = $scope.store.getProduct($routeParams.productID);
		$scope.productID = $routeParams.productID;
  }
   // use routing to pick the selected category
  if ($routeParams.categoryID != null) {
	    $scope.categoryID = $routeParams.categoryID;
  }
  
}