'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'controllers',
  'suggestionServices',
  'directives'
]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/foods', {
        templateUrl: 'Partials/defaultView.html',
        controller: 'DefaultViewController'
      }).
      when('/foods/:suggestionId', {
        templateUrl: 'Partials/suggestions.html',
        controller: 'SuggestionController'
      }).
      otherwise({
        redirectTo: '/foods'
      });
  }]);
