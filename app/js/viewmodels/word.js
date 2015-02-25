define(['knockout', './basevm'],

function(ko, BaseVM) {

	var vm = {
	};

	ko.utils.extend(vm, BaseVM);

	vm.app.route('get', '#/words', function(ctx){

		vm.render('<p>Words</p>');
	});
	
});