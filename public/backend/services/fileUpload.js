myApp.service('fileUpload', ['$http','$location','$routeParams', function ($http,$location,$routeParams) {
 this.uploadFileToUrl = function(file, uploadUrl,iIdProyecto){
   console.log("FileUpload Service");
    console.log("ID Proyecto:",iIdProyecto)
    //console.log("File: ",file)
    //console.log("Route Params:",$routeParams)
    var fd = new FormData();
    fd.append('file', file);

    console.log("FD: ",fd);

    $http.put(uploadUrl, fd, {
       //Esto lo que hace es darle el poder a $http de decidir el content type correcto
       transformRequest: angular.identity,
       headers: {'Content-Type': undefined}
     }).success(function(){
      console.log("Success de Upload idProyecto: ",iIdProyecto)
      $location.path('/Editar/').search({idProyecto: iIdProyecto})

    }).error(function(){
      console.log("Error de Upload");
    });
   }
}])
