angular.module('angularFilters',[]).filter('buttonlegend',function(){
	return function(input){
		switch(input){
			case 'started':
				legend = 'finish'
			break;
			default:
				legend = 'start';
		}
		return legend;
	}
});