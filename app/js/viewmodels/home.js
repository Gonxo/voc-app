define(['knockout', './basevm', 'text!../templates/home.html'],

function(ko, BaseVM, htmlString) {

	function Home() {

		var self = this;

		ko.utils.extend(self, new BaseVM());

		self.dashboard = function(ctx) {

			self.title = 'Home';
			self.render(self, htmlString);
		};
	}

	return new Home();

});