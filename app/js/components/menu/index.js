define(['../../app', 'knockout', 'text!./index.html'],

function(App, ko, htmlString){

	var vm = {

		tab: ko.observable(-1),

		items: [
			{ label: 'Home', route: '#/' },
			{ label: 'Words', route: '#/words' },
			{ label: 'Categories', route: '#/categories' },
		],
	};

	// Subscribes to 'route-found' event to update menu tab
	App.bind('route-found', function(ev, data){

		vm.tab(-1);

		ko.utils.arrayFirst(vm.items, function(v, k) {
			if(data.route.path.test(v.route)) {
				vm.tab(k);
			}
		});
	});

	return {

		viewModel : vm,

		name: 'main-menu',

		template: htmlString,

		element: document.getElementById('mainMenu'),
		
	};

});