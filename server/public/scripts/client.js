const myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html'
  }).when('/songify', {
    templateUrl: 'views/songify.html'
  }).otherwise ({
    template: '<h2>404 Page Not Found </h2>'
  })
});
