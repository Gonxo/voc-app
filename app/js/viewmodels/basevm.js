define(['../app', 'sammy', 'knockout'],

function(App, Sammy, ko) {

	//console.log(Sammy.Store);

	var vm = {

		app: App,

		selector: App.$element().find('#appView').selector,

	};

	vm.render = function(htmlString) {

		ko.cleanNode( $(vm.selector)[0] );
			
		$(vm.selector).html(htmlString);

		ko.applyBindings(this, $(vm.selector)[0] );
	};

	return vm;

});