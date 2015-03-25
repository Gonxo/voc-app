define(['./app', './viewmodels/home', './viewmodels/word', './viewmodels/category'],

function(App, Home, Word, Category) {

	App.bind('add-category', function(){

		Word.categories = Category.getItems() || [];
	});

});