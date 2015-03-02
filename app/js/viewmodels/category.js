define(['knockout', 'komapping', './basevm',
		'text!../templates/category/edit.html', 'text!../templates/category/list.html'],

function(ko, komapping, BaseVM, EditTmpl, ListTmpl) {

	// Single category view-model
	var Category = function(){
		this.id = ko.observable();
		this.label = ko.observable();
		this.description = ko.observable();
	},
		VM = ko.utils.extend({ KEYSTORE: 'categories', items: ko.observableArray() }, BaseVM);

// Gets list of categories
	VM.get_list = function(ctx){

		// Initially, check for categories in LocalStorage
		VM.items(
			ko.utils.arrayMap(VM.store.get(VM.KEYSTORE) || [],
				function(item) {
					return komapping.fromJS(item, new Category());
		}));

		VM.title = 'Categories';
		VM.render(ListTmpl);
	};

// Deletes list of categoires
	VM.delete_list = function(ctx) {

		if(confirm('Do you really want to remove all categories?')) {
			VM.items([]);
			VM.store.clear(VM.KEYSTORE);
			// TODO: delete all words
		}
	};

// Gets category
	VM.get_item = function(ctx) {

		VM.action = '#/category';

		if(ctx.params.id === "add") {
			VM.item = new Category();
			VM.title = 'Add new category';
		} else {
			VM.item = ko.utils.arrayFirst(VM.items(), function(item) {
				if(item.id() == ctx.params.id)
					return item;
			});
			VM.title = 'Edit category';
			VM.action += '/' + VM.item.id();
		}

		VM.render(EditTmpl);
	};

// Create category
	VM.post_item = function(ctx) {

		// TODO: Check label not exists 
		ctx.params.id = (VM.items().length > 0) ?
			VM.items()[VM.items().length-1].id()+1 : 1;

		// Push new item at collection
		VM.items.push(komapping.fromJS(ctx.params, Category));

		// Save entire collection at LocalStorage
		VM.store.set(VM.KEYSTORE, ko.toJSON(komapping.toJS(VM.items())));

		window.location.hash = '#/categories';
	};

// Edit category
	VM.put_item = function(ctx) {

		VM.item = ko.utils.arrayFirst(VM.items(), function(item) {
			if(item.id() == ctx.params.id)
				return item;
		});

		VM.item.label(ctx.params.label);
		VM.item.description(ctx.params.description);

		// Save entire collection at LocalStorage
		VM.store.set(VM.KEYSTORE, ko.toJSON(komapping.toJS(VM.items())));

		window.location.hash = '#/categories';
	};

// Delete category
	VM.delete_item = function(ctx) {

		if(confirm("Do you really want to remove this category?")) {

			var index = false;
			ko.utils.arrayFirst(VM.items(), function(item, idx) {
				if(item.id() == ctx.params.id)
					index = idx;
			});
			VM.items.splice(index, 1);
			VM.store.set(VM.KEYSTORE, ko.toJSON(VM.items()));
			// TODO: delete related words
		}
	};

	return VM;
});