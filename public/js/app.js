'use strict';

// Declare app level module which depends on filters, and services
angular.module('whatdo', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/main', {templateUrl: 'partials/main', controller: WhatdoCtrl});
    $routeProvider.otherwise({redirectTo: '/main'});
    $locationProvider.html5Mode(true);
	}]);