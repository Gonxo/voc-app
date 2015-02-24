define(['knockout', './menu/index'],

function(ko){

	for(var i= 1; i< arguments.length; i++) {

		var component = arguments[i];

		ko.components.register(component.name, { template: component.template });

		ko.applyBindings(component.viewModel, component.element);
	}
});