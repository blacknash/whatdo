'use strict';

/* Controllers */
function WhatdoCtrl($scope,$http){

	$http.get('/projects/getlist.json').success(function(data){
		$scope.projects = data;
		$scope.myproject = $scope.projects[0];
		$scope.updateLists($scope.projects[0]);
	});

	$scope.updateLists = function(projectselected){
		var params = {project:projectselected.id};
		$scope.myproject = projectselected;

		$http.post('/todos/getlist.json',params).success(function(data){
			$scope.todos = data;
		});

		$http.post('/users/getlist.json',params).success(function(data){
			$scope.users = data;
		});
	};

	$scope.addTodo = function(){
		
		var params = {
			description: $scope.tododescription,
			responsable: $scope.todoresponsable.initials,
			checker: $scope.todochecker.initials, 
			project: $scope.myproject.id,
			status: 'created',
			priority: 1,
			created:new Date(),
			updated:new Date()
		};

		$http.post("/todos/save.json",params).success(function(data){
			params._id = data.id;
			$scope.todos.push(params);
			$scope.tododescription= "";
			$scope.todoresponsable= "";
		});

	};

	$scope.updateTodo = function($index,status){
		var newstatus = null;
		if(typeof status=="undefined"){
			var statuslist = ['created','started','revision','rejected','started'];
			newstatus = statuslist[ parseInt(statuslist.indexOf($scope.todos[$index].status),10)+1 ];
		}else{
			newstatus = status;
		}

		var params = {
			id: $scope.todos[$index]._id,
			status: newstatus
		};

		$scope.todos[$index].status = newstatus;
		$http.post("/todos/update.json",params).success(function(){
			$scope.todos[$index].status = newstatus;
		});
	};

	$scope.deleteTodo = function($index){
		var params = {
			id: $scope.todos[$index]._id,
		};

		$http.post("/todos/delete.json",params).success(function(){
			$scope.todos.splice($index,1);
		});
		
	}

}