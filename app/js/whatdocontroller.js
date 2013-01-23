function WhatdoCtrl($scope,$http){
	$http.get('server/todos/getlist.json').success(function(data){
		$scope.todos = data;
	});

	$http.get('server/todos/getlistaccepted.json').success(function(data){
		$scope.todosaccepted = data;
	});

	
	$http.get('server/users/getlist.json').success(function(data){
		$scope.users = data;
	});

	$scope.save = function(){
		data = {
			description: $scope.tododescription,
			responsable: $scope.todoresponsable.id,
			checker: $scope.todochecker.id, 
			status: 'created',
			priority: 1
		};
		
		$http.post("server/todos/save.json",data).success(function(id){
			data.id = id;
			$scope.todos.push(data);
			$scope.tododescription= "";
			$scope.todoresponsable= "";
		});
	}

	$scope.updateTodo = function($index,id,status){
		
		if(typeof status=="undefined"){
			statuslist = ['created','started','revision','rejected','started'];
			newstatus = statuslist[ parseInt(statuslist.indexOf($scope.todos[$index].status),10)+1 ];
		}else{
			newstatus = status;
		}

		data = {
			id: $scope.todos[$index].id,
			status: newstatus
		};

		$http.post("server/todos/update.json",data).success(function(){
			$scope.todos[$index].status = newstatus;
		});
	}

	$scope.remaining = function(){
		var count = 0;
		angular.forEach($scope.todos,function(todo){
			count += todo.status=='accepted' ? 0 : 1;
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