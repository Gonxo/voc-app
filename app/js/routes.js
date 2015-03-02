define(['./app', './viewmodels/home', './viewmodels/word', './viewmodels/category'],

function(App, Home, Word, Category) {

// Home
	App.route('get', '#/', Home.dashboard);


// Word
	// List of items
	App.route('get',	'#/words',			Word.get_list);
	App.route('delete',	'#/words',			Word.delete_list);

	// Single item
	App.route('get',	'#/word/:id',		Word.get_item);
	App.route('post',	'#/word',			Word.post_item);
	App.route('put',	'#/word/:id',		Word.put_item);
	App.route('delete',	'#/word/:id',		Word.delete_item);


// Category

	// List of items
	App.route('get',	'#/categories',		Category.get_list);
	App.route('delete',	'#/categories',		Category.delete_list);

	// Single item
	App.route('get',	'#/category/:id',	Category.get_item);
	App.route('post',	'#/category',		Category.post_item);
	App.route('put',	'#/category/:id',	Category.put_item);
	App.route('delete',	'#/category/:id',	Category.delete_item);

});