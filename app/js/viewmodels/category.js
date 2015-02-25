define(['knockout', './basevm', 'text!../templates/categories.html', 'text!../templates/category.html'],

function(ko, BaseVM, CategoriesTmpl, CategoryTmpl) {

	function Category(data){

		this.id = ko.observable();
		this.label = ko.observable();
		this.description = ko.observable();

		if(data) {
			this.id(data.id);
			this.label(data.label);
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


		// List
		this.app.route('get', '#/categories', function(ctx){

			self.title = 'Categories';
			self.render(CategoriesTmpl);
		});

		// Add
		this.app.route('get', '#/category/add', function(ctx){

			self.item = new Category();
			self.title = 'Add new category';
			self.action = '#' + ctx.path.split('/#')[1];

			self.render(CategoryTmpl);
		});

		this.app.route('post', '#/category/add', function(ctx){
				
			// TODO: Check label not exists 
			ctx.params.id = (self.items().length > 0) ?
				self.items()[self.items().length-1].id()+1 : 1;

			// Push new item at collection
			self.items.push(new Category(ctx.params));

			// Save entire collection at LocalStorage
			self.app.store.set('categories', ko.toJSON(self.items()));

			window.location.hash = '#/categories';
		});

		// Edit
		this.app.route('get', '#/category/edit/:id', function(ctx){

			self.item = ko.utils.arrayFirst(self.items(), function(item) {
				if(item.id() == ctx.params.id)
					return item;
			});
			
			if(self.item) {
				
				self.title = 'Edit category';
				self.action = '#' + ctx.path.split('/#')[1];

				self.render(CategoryTmpl);
			}
		});

		this.app.route('put', '#/category/edit/:id', function(ctx){

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
	}

	return new Categories();
});