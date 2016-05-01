myApp.controller('AltaController', ['$scope', '$http', '$location',function($scope, $http, $location) {
  $scope.createProyect = function(){
    console.log("CREANDO PROYECTO");
    $http.post('/proyectos', $scope.proyecto).success(function(data, status){
      //$scope.proyectos = data;
      $scope.proyecto.nombre = '';
      $scope.proyecto.descripcion = '';

      //$location.path('/');
      $location.path('/Editar/').search({idProyecto: data._id});
    }).error(function(data, status){
            alert("error : "+status);
        });;
  }
}]);
