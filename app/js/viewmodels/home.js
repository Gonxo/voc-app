define(['knockout', './basevm', 'text!../templates/home.html'],

function(ko, BaseVM, htmlString) {


	var VM = ko.utils.extend({}, BaseVM);

	VM.dashboard = function(ctx) {

		VM.title = 'Home';
		VM.render(htmlString);
	};

	return VM;

});