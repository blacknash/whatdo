function WhatdoCtrl($scope,$http){
	$http.get('server/todos/getlist.json').success(function(data){
		$scope.todos = data;
	});

	$http.get('server/users/getlist.json').success(function(data){
		$scope.users = data;
	});

	$scope.save = function(){
		data = {
			description: $scope.tododescription,
			done: false,
			responsable: $scope.todoresponsable.id,
			checker: $scope.todochecker.id, 
			status: 'created',
			priority: 1
		};
		
		$http.post("server/todos/save",data).success(function(){
			$scope.todos.push(data);
			$scope.tododescription= "";
			$scope.todoresponsable= "";
		});
	}

	$scope.updateTodo = function($index,id){
		newstatus = "started";
		data = {
			id: $scope.todos[$index].id,
			status: newstatus
		};
		$http.post("server/todos/update",data).success(function(){
			$scope.todos[$index].status = newstatus;
		});

	}

	$scope.remaining = function(){
		var count = 0;
		angular.forEach($scope.todos,function(todo){
			count += todo.done ? 0 : 1;
		});
		return count;
	}
}

function LoginCtrl($scope,$http,$rootScope,$location){
	$scope.welcome = "Welcome";
	$rootScope.loggedUser = true;
	if($rootScope.loggedUser){
		$location.path("/main");
	}
}