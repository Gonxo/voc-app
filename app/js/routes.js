define(['knockout', './app', './viewmodels/home', './viewmodels/word', './viewmodels/category'],

function(ko, App, Home, Words, Categories) {

// Home
	App.route('get', '#/', Home.dashboard);


// Word
	// List of items
	App.route('get',	'#/words',			Words.get_list);
	App.route('delete',	'#/words',			Words.delete_list);

	// Single item
	App.route('get',	'#/word/:id',		Words.get_item);
	App.route('post',	'#/word',			Words.post_item);
	App.route('put',	'#/word/:id',		Words.put_item);
	App.route('delete',	'#/word/:id',		Words.delete_item);


// Category

	// List of items
	App.route('get',	'#/categories',		Categories.get_list);
	App.route('delete',	'#/categories',		Categories.delete_list);

	// Single item
	App.route('get',	'#/category/:id',	Categories.get_item);
	App.route('post',	'#/category',		Categories.post_item);
	App.route('put',	'#/category/:id',	Categories.put_item);
	App.route('delete',	'#/category/:id',	Categories.delete_item);

});