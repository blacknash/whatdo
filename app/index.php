<!doctype html>
<html lang="en" ng-app>
<head>
	<meta charset="utf-8">
	<title>What do?</title>

	<link rel="stylesheet" href="/css/bootstrap.css">

	<script src="/lib/angular/angular.js"></script>
	<script src="/lib/angular/angular-resource.js"></script>
	<script src="/js/app.js"></script>
	<script src="/js/whatdo.js"></script>

</head>

<body ng-controller="WhatdoCtrl">
	<div class="container-fluid">
		<h1>What do?</h1>
		<div class="row">
			
			<form class="whatdo-form span3" ng-submit="save()">
				<label>Description</label>
				<textarea ng-model="tododescription"></textarea>
				<label>Responsable</label>
				<select ng-model="todoresponsable" ng-options="user.name for user in users"></select>
				<div class="buttons">
				<input type="submit" class="btn btn-primary" value="Save"/>
				</div>
			</form>

			<div class='whatdo-list span5'>
				<input ng-model="query"  placeholder="Search"/>
				<div>Todos : <span>{{remaining()}}</span> of {{todos.length}}</div>
				<ul>
					<li ng-repeat="todo in todos | filter:query">
						<input type="checkbox" ng-model="todo.done"> 
						<span class="done-{{todo.done}}">{{todo.description}}</span>
						<span class='responsable'>{{todo.responsable}}</span>
					</li>
				</ul>
			</div>

		</div>
	</div>
</body>
</html>