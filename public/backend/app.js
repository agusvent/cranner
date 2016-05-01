var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/',{
    templateUrl : 'pages/listProyecto.html',
    controller  : "MainController"
  })
    .when('/Alta',{
      templateUrl : 'pages/altaProyecto.html',
      controller  : "AltaController"
    })
    .when('/Editar/',{
      templateUrl : 'pages/editarProyecto.html',
      controller  : "EditController"
    })
}])

myApp.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}])
