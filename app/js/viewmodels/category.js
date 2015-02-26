define(['knockout', './basevm', 'text!../templates/categories.html', 'text!../templates/category.html'],

function(ko, BaseVM, CategoriesTmpl, CategoryTmpl) {

	function Category(data){

		this.id = ko.observable();
		this.label = ko.observable();
		this.description = ko.observable();

		if(data) {
			this.id(data.id);
			this.label(data.label.toLowerCase());
			this.description(data.description);
		}
	}

	function Categories() {

		var self = this;

		ko.utils.extend(self, BaseVM);

		this.items = ko.observableArray();
		

	// Initially, check for categories in LocalStorage
		this.items(
			ko.utils.arrayMap(self.app.store.get('categories') || [],
				function(item) {
					return new Category(item);
		}));


		// Get list
		this.app.route('get', '#/categories', function(ctx){

			self.title = 'Categories';
			self.render(CategoriesTmpl);
		});

		// Delete list
		this.app.route('delete', '#/categories', function(ctx){

			if(confirm('Do you really want to remove all categories?')) {
				self.items([]);
				self.app.store.clear('categories');
			}
		});

		// Gets a category
		this.app.route('get', '#/category/:id', function(ctx){

			self.action = '#/category';

			if(ctx.params.id === "add") {
				self.item = new Category();
				self.title = 'Add new category!';
			} else {
				self.item = ko.utils.arrayFirst(self.items(), function(item) {
					if(item.id() == ctx.params.id)
						return item;
				});
				self.title = 'Edit category!';
				self.action += '/' + self.item.id();
			}

			self.render(CategoryTmpl);
		});

		// Create category
		this.app.route('post', '#/category', function(ctx){
				
			// TODO: Check label not exists 
			ctx.params.id = (self.items().length > 0) ?
				self.items()[self.items().length-1].id()+1 : 1;

			// Push new item at collection
			self.items.push(new Category(ctx.params));

			// Save entire collection at LocalStorage
			self.app.store.set('categories', ko.toJSON(self.items()));

			window.location.hash = '#/categories';
		});

		// Edit category
		this.app.route('put', '#/category/:id', function(ctx){

			self.item = ko.utils.arrayFirst(self.items(), function(item) {
				if(item.id() == ctx.params.id)
					return item;
			});

			self.item.label(ctx.params.label);
			self.item.description(ctx.params.description);

			// Save entire collection at LocalStorage
			self.app.store.set('categories', ko.toJSON(self.items()));

			window.location.hash = '#/categories';
		});

		// Delete category
		this.app.route('delete', '#/category/:id', function(ctx){

			if(confirm("Do you really want to remove this category?")) {

				var index = false;
				ko.utils.arrayFirst(self.items(), function(item, idx) {
					if(item.id() == ctx.params.id)
						index = idx;
				});
				self.items.splice(index, 1);
				self.app.store.set('categories', ko.toJSON(self.items()));
			}
		});
	}

	return new Categories();
});