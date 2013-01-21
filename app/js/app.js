angular.module('whatdo', ['angularFilters']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/main', {templateUrl: 'partials/main.html',   controller: WhatdoCtrl}).
      otherwise({redirectTo: '/main'});
}]);