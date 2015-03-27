define(['knockout', 'komapping', './basevm', './category',
		'text!../templates/word/edit.html', 'text!../templates/word/list.html'],

function(ko, komapping, BaseVM, Categories, EditTmpl, ListTmpl) {

	// Single word View-Model
	var Word = function(){

		this.id = ko.observable();
		this.label = ko.observable();
		this.cat_id = ko.observable();
		this.description = ko.observable();
	};

	//	VM = ko.utils.extend({ KEYSTORE: 'words', mapObj: Word }, new BaseVM());

// Words View-Model
	function Words() {

		var self = this;

		ko.utils.extend(self, new BaseVM(
			{KEYSTORE: 'words', mapObj: Word}));

		Categories.mapItems();
		self.categories = ko.observableArray(Categories.items());

	// Gets category label from ID.
		self.getCategory = function(cat_id){
			var category = ko.utils.arrayFirst(self.categories(), function(item){
				if(cat_id == item.id()) return item;
			});
			return category.label();
		};

	// Gets list of words
		self.get_list = function(ctx) {
			self.title = 'Words';

			// Check for words in LocalStorage and render list template.
			self.mapItems();
			self.render(self, ListTmpl);
		};

	// Delete list of words
		self.delete_list = function(ctx) {
			// TODO
		};

	// Gets word
		self.get_item = function(ctx) {

			self.action = '#/word';

			if(ctx.params.id === "add") {
				self.item = new Word();
				self.title = 'Add new word';
			} else {
				self.item = ko.utils.arrayFirst(self.items(), function(item) {
					if(item.id() == ctx.params.id)
						return item;
				});
				self.title = 'Edit word';
				self.action += '/' + self.item.id();
			}

			self.render(self, EditTmpl);
		};

	// Create word
		self.post_item = function(ctx) {

			// TODO: Check label not exists 
			ctx.params.id = (self.items().length > 0) ?
				self.items()[self.items().length-1].id()+1 : 1;

			// Push new item at collection
			self.items.push(komapping.fromJS(ctx.params, Word));
			self.save();

			window.location.hash = '#/words';
		};

	// Edit word
		self.put_item = function(ctx) {

			self.item = ko.utils.arrayFirst(self.items(), function(item) {
				if(item.id() == ctx.params.id)
					return item;
			});

			self.item.label(ctx.params.label);
			self.item.cat_id(ctx.params.cat_id);
			self.item.description(ctx.params.description);
			self.save();

			window.location.hash = '#/words';
		};

	// Delete word
		self.delete_item = function(ctx) {

			if(confirm("Do you really want to remove this word?")) {

				var index = false;
				ko.utils.arrayFirst(self.items(), function(item, idx) {
					if(item.id() == ctx.params.id)
						index = idx;
				});
				self.items.splice(index, 1);
				self.save();
			}
		};

	// Events

		self.bind('categories-change', function(e){

			self.categories(Categories.items());
		});

		self.bind('categories-remove', function(e, data) {

			var removeArray = [];

			if(data && data.cat_id) {
				self.mapItems();
				ko.utils.arrayForEach(self.items(), function(item) {
					if(item.cat_id() == data.cat_id) {
						removeArray.push(item);
					}
				});

				ko.utils.arrayForEach(removeArray, function(item) {
					self.items.remove(item);
				});
			} else { self.items([]); }

			self.save();
		});
	}
	
	return new Words();
});