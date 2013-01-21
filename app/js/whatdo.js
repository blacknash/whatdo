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
		$scope.todos[$index].status = 'started';
	}

	$scope.remaining = function(){
		var count = 0;
		angular.forEach($scope.todos,function(todo){
			count += todo.done ? 0 : 1;
		});
		return count;
	}
}