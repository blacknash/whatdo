'use strict';

/* Filters */

angular.module('myApp.filters',[]).filter('buttonlegend',function(){
	return function(input){
		var legend = "";
		switch(input){
			case 'started':
				legend = 'finish'
			break;
			case 'revision':
				legend = 'deliver';
			break;
			case 'rejected':
				legend = 'restart';
			break;
			default:
				legend = 'start';
		}
		return legend;
	}
});