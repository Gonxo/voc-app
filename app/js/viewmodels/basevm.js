define(['knockout', '../app'],

function(ko, App) {

	var VM = {

		bind: App.bind,

		store: App.store,

		trigger: function(name, data){ 
			App.trigger(name, data);
		},

		selector: App.$element().find('#appView').selector,
	};

	VM.render = function(htmlString) {

		ko.cleanNode( $(VM.selector)[0] );
			
		$(VM.selector).html(htmlString);

		ko.applyBindings(this, $(VM.selector)[0] );
	};

	VM.getItems = function() {
		return (this.KEYSTORE) ? VM.store.get(this.KEYSTORE) : [];
	};

	return VM;

});