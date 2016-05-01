myApp.controller('EditController',['$scope','$http', '$location', '$routeParams','fileUpload',function($scope, $http, $location, $routeParams,fileUpload){
  $scope.message = "En el Edit Controller";
  console.log("ID Proyecto: "+$routeParams.idProyecto);
  $scope.idProyecto = $routeParams.idProyecto;
  $http.get('/proyecto/'+$routeParams.idProyecto).success(function(response){
    console.log("Buscando Proyecto. Respuesta:"+response);
    $scope.proyecto = response;
  });

  $scope.uploadFile = function(){
     var file = $scope.myFile;

     console.log('file is ' );
     console.dir(file);

     var uploadUrl = "/fileUpload";
     fileUpload.uploadFileToUrl(file, uploadUrl);
  }

  $scope.editProject = function(oProyecto){
    console.log("Proyecto: "+oProyecto._id);
    console.log("Scope Proyecto: "+$scope.proyecto._id);
    $http.put('/proyecto',$scope.proyecto).success(function(data,status){
      $location.path('/');
    }).error(function(data, status){
        alert("error : "+status);
    });;
  }

  $scope.volver = function(){
    $location.path('/');
  }
}]);
