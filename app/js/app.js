'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'controllers',
  'suggestionServices'
]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/foods', {
        templateUrl: 'Partials/defaultView.html',
        controller: 'FoodsController'
      }).
      when('/foods/:suggestionId', {
        templateUrl: 'Partials/suggestions.html',
        controller: 'ActionController'
      }).
      otherwise({
        redirectTo: '/foods'
      });
  }]);
