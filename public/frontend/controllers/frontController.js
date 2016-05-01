myFrontend.controller('FrontController',['$scope', '$http', '$location','$anchorScroll',function($scope, $http, $location, $anchorScroll) {
  $scope.refresh = function(){
    $http.get('/proyectos').success(function(response){
      console.log("Refresh Proyectos Frontend");
      $scope.proyectos = response;
    });
  };
  $scope.refresh();

  $scope.scrollTo = function(id,event){
    console.log("Scroll To Event: "+event);
    event.preventDefault();
    $location.hash(id);
    $anchorScroll();
  }
}]);
