define(['knockout', './basevm', 'text!../templates/home.html'],

function(ko, BaseVM, htmlString) {

	var vm = {
		intro: 'TODO: Template for home view',
	};

	ko.utils.extend(vm, BaseVM);

	vm.app.route('get', '#/', function(ctx){

		vm.render(htmlString);
	});

});