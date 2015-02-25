define(['knockout', './basevm'],

function(ko, BaseVM) {

	var vm = {
	};

	ko.utils.extend(vm, BaseVM);

	vm.app.route('get', '#/categories', function(ctx){

		vm.render('<p>Categories</p>');
	});
	
});