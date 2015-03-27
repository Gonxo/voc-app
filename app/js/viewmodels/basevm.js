define(['knockout', 'komapping', '../app'],

function(ko, komapping, App) {

	function BaseVM(params) {

		var self = this;

		ko.utils.extend(self, params);

		self.store = App.store;

		self.items = ko.observableArray();

		self.selector = App.$element().find('#appView').selector;

		self.bind = function(event, callback) {
			App.bind(event, callback);
		};

		self.trigger = function(name, data) {

			App.trigger(name, data);
		};

		self.render = function(viewmodel, htmlString) {

			ko.cleanNode($(self.selector)[0]);
			$(self.selector).html(htmlString);
			ko.applyBindings(viewmodel, $(self.selector)[0]);
		};

		self.mapItems = function() {

			var ls_items = self.store.get(self.KEYSTORE) || [];
			self.items(ko.utils.arrayMap(ls_items, function(item) {
				return komapping.fromJS(item, new self.mapObj());
			}));
		};

		// Save entire collection at LocalStorage
		self.save = function() {

			self.store.set(self.KEYSTORE, ko.toJSON(komapping.toJS(self.items())));
		};
	}

	return BaseVM;

});