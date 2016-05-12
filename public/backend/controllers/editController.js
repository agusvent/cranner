myApp.controller('EditController',['$scope','$http', '$location', '$routeParams','fileUpload',function($scope, $http, $location, $routeParams,fileUpload){
  $scope.message = "En el Edit Controller";
  $scope.refresh = function(){
    console.log("ID Proyecto: "+$routeParams.idProyecto);
    $scope.idProyecto = $routeParams.idProyecto;
    $http.get('/proyecto/'+$routeParams.idProyecto).success(function(response){
      console.log("Buscando Proyecto. Respuesta:"+response);
      $scope.proyecto = response;
    });
  }

  $scope.refresh();

  $scope.uploadFile = function(){
     var file = $scope.myFile;
     var idProyecto = $scope.idProyecto;
     console.log("El ID Proyecto es: ",idProyecto)

     console.log('file is ' );
     console.dir(file);
     var fileName = file.name;
     var uploadUrl = "/fileUpload?idProyecto="+idProyecto+"&fileName="+fileName;
     fileUpload.uploadFileToUrl(file, uploadUrl,idProyecto);
  }

  $scope.editProject = function(oProyecto){
    console.log("Proyecto: "+oProyecto._id);
    console.log("Scope Proyecto: "+$scope.proyecto._id);
    $http.put('/proyecto',$scope.proyecto).success(function(data,status){
      $location.path('/Listado');
    }).error(function(data, status){
        alert("error : "+status);
    });;
  }

  $scope.volver = function(){
    $location.path('/Listado');
  }

  $scope.deleteImage = function(oImagen){
    console.log("******************************")
    console.log("EDIT CONTROLLER - DELETE IMAGE")
    console.log("******************************")
    console.log("Eliminar Imagen: ",oImagen._id);
    console.log("Eliminar Imagen ID Proyecto: ",$scope.proyecto._id);
    var idProyecto = $scope.proyecto._id;
    var idImagen = oImagen._id;
    $http.delete('/eliminarImagen', {params: {idImagen:idImagen,idProyecto:idProyecto}})
      .success(function(data,status){
        $scope.refresh();
      })
      .error(function(data,status){
        console.log("Error al eliminar");
      })
    }

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      console.log("DropDown abierto!")
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

    $scope.modalDeleteImage = function(oImage){

    }
}]);
