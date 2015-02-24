define(['knockout', 'text!./index.html'],

function(ko, htmlString){

	return {

		name: 'main-menu',

		template: htmlString,

		element: document.getElementById('mainMenu'),

		viewModel : {

			tab: ko.observable(0),

			items: [
				{ label: 'Words', route: '#/words' },
				{ label: 'Categories', route: '#/categories' },
			],
		}
	};

});