define(['knockout', 'komapping', './basevm', './category',
		'text!../templates/word/edit.html', 'text!../templates/word/list.html'],

function(ko, komapping, BaseVM, Category, EditTmpl, ListTmpl) {

	// Single word view-model
	var Word = {
		id: ko.observable(),
		label: ko.observable(),
		cat_id: ko.observable(),
		description: ko.observable(),
		//categories: Category.getItems() || [],
	},
		VM = ko.utils.extend({ KEYSTORE: 'words', items: ko.observableArray() }, BaseVM);

	/*Word.category = ko.computed(function(){
		var self = this;
		return ko.utils.arrayFirst(Category.getItems(), function(item){
			if(self.cat_id() == item.id) {
				return item.label();
			}
		});
	}, Word);*/
	
	VM.categories = Category.getItems() || [];

// Gets list of words
	VM.get_list = function(ctx) {

		//$parentContext

		// Initially, check for words in LocalStorage
		VM.items(
			ko.utils.arrayMap(VM.store.get(VM.KEYSTORE) || [],
				function(item) {
					return komapping.fromJS(item, Word);
		}));

		VM.title = 'Words';
		VM.render(ListTmpl);
	};

// Delete list of words
	VM.delete_list = function(ctx) {

	};

// Gets word
	VM.get_item = function(ctx) {

		VM.action = '#/word';

		if(ctx.params.id === "add") {
			VM.item = Word;
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

// Create word
	VM.post_item = function(ctx) {

		// TODO: Check label not exists 
		ctx.params.id = (VM.items().length > 0) ?
			VM.items()[VM.items().length-1].id()+1 : 1;

		// Push new item at collection
		VM.items.push(komapping.fromJS(ctx.params));

		console.log(ko.toJS(VM.items()));
		// Save entire collection at LocalStorage
		//VM.store.set(VM.KEYSTORE, ko.toJSON(VM.items()));

		//window.location.hash = '#/words';
	};

// Edit word
	VM.put_item = function(ctx) {

		VM.item = ko.utils.arrayFirst(VM.items(), function(item) {
			if(item.id() == ctx.params.id)
				return item;
		});

		VM.item.label(ctx.params.label);
		VM.item.cat_id(ctx.params.cat_id);
		VM.item.description(ctx.params.description);

		// Save entire collection at LocalStorage
		VM.store.set(VM.KEYSTORE, ko.toJSON(VM.items()));

		window.location.hash = '#/words';
	};

// Delete word
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