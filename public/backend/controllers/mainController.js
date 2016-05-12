myApp.controller('MainController',['$scope', '$http', '$location', function($scope, $http, $location) {
  console.log("Entro al MainController");
  $scope.refresh = function(){
    console.log("Llego al Scope.refresh");
    $http.get('/proyectos').success(function(response){
      console.log("Refresh Proyectos Backend");
      $scope.proyectos = response;
    });
  };

  $scope.editProject = function(oProyecto){
    console.log(oProyecto);
    //con .search le paso parametros a la siguiente pantalla.
    console.log("ID: "+oProyecto._id);
    $location.path('/Editar/').search({idProyecto: oProyecto._id});
  };

  $scope.deleteProject = function(oProyecto){
    console.log("Controller Angular: Listo para borrar proyecto");
    //console.log("Objeto Proyecto:"+oProyecto);
    $http.delete('/proyectos/'+oProyecto._id).success(function(status){

        }).error(function(data, status){
          alert("error : "+status);
        });;
    $scope.refresh();
  }
}]);
