define(['knockout', 'komapping', './basevm',
		'text!../templates/category/edit.html', 'text!../templates/category/list.html'],

function(ko, komapping, BaseVM, EditTmpl, ListTmpl) {


	// Single category View-Model
	var Category = function() {

		this.id = ko.observable();
		this.label = ko.observable();
		this.description = ko.observable();
	};

// Categories View-Model
	function Categories() {

		var self = this;

		ko.utils.extend(self, new BaseVM(
			{KEYSTORE: 'categories', mapObj: Category}));

		self.items.subscribe(function(changes) {

			self.trigger('categories-change');
		}, null, "arrayChange");

	// Gets list of categories
		self.get_list = function(ctx) {

			self.title = 'Categories';

			// Check for categories in LocalStorage and render list template.
			self.mapItems();
			self.render(self, ListTmpl);
		};

	// Deletes list of categoires
		self.delete_list = function(ctx) {

			if(confirm('Do you really want to remove all categories? This action also will remove all words.')) {
				self.items([]);
				self.save();
				self.trigger('categories-remove');
			}
		};

	// Gets category
		self.get_item = function(ctx) {

			self.action = '#/category';

			if(ctx.params.id === "add") {
				self.item = new Category();
				self.title = 'Add new category';
			} else {
				self.item = ko.utils.arrayFirst(self.items(), function(item) {
					if(item.id() == ctx.params.id)
						return item;
				});
				self.title = 'Edit category';
				self.action += '/' + self.item.id();
			}

			self.render(self, EditTmpl);
		};

	// Create category
		self.post_item = function(ctx) {

			// TODO: Check for duplicate labels
			ctx.params.id = (self.items().length > 0) ?
				self.items()[self.items().length-1].id()+1 : 1;

			// Push new item at collection
			self.items.push(komapping.fromJS(ctx.params, Category));
			self.save();

			window.location.hash = '#/categories';
		};

	// Edit category
		self.put_item = function(ctx) {

			self.item = ko.utils.arrayFirst(self.items(), function(item) {
				if(item.id() == ctx.params.id)
					return item;
			});

			self.item.label(ctx.params.label);
			self.item.description(ctx.params.description);
			self.save();

			window.location.hash = '#/categories';
		};

	// Delete category
		self.delete_item = function(ctx) {

			if(confirm("Do you really want to remove this category and the words related with it?")) {

				ko.utils.arrayFirst(self.items(), function(item) {
					if(item && item.id() == ctx.params.id) {
						self.items.remove(item);
						self.save();

						self.trigger('categories-remove', {cat_id: ctx.params.id});
					}
				});
			}
		};

	}

	return new Categories();

});