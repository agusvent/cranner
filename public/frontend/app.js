var myFrontend = angular.module('myFrontend', ['ngRoute']);

myFrontend.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
      .when('/',{
        templateUrl : 'frontend/pages/cranner2.html',
        controller: 'FrontController'
      })
}])
