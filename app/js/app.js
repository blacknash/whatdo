module = angular.module('whatdo', ['angularFilters']);
module.config(['$routeProvider', function($routeProvider){
  $routeProvider.
      when('/main', {templateUrl: 'partials/main.html',   controller: WhatdoCtrl}).
      when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl}).
      otherwise({redirectTo: '/login'});
	}]);
module.run( function($rootScope,$location){
	 $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( $rootScope.loggedUser == null ) {
        if ( next.templateUrl == "partials/login.html" ) {
          // already going to #login, no redirect needed
        } else {
          $location.path( "/login" );
        }
      }         
    });
}

	);