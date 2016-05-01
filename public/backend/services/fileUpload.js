myApp.service('fileUpload', ['$http', function ($http) {
 this.uploadFileToUrl = function(file, uploadUrl){
    console.log("FileUpload Service");
    var fd = new FormData();
    fd.append('file', file);

    //Esto lo que hace es darle el poder a $http de decidir el content type correcto
    $http.post(uploadUrl, fd, {
       transformRequest: angular.identity,
       headers: {'Content-Type': undefined}
    })

    .success(function(){
      console.log("Success de Upload");
    })

    .error(function(){
      console.log("Error de Upload");
    });
   }
}])
