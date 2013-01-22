angular.module('angularFilters',[]).filter('buttonlegend',function(){
	return function(input){
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