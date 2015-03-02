requirejs.config({

	paths: {
		knockout:		'../../bower_components/knockout/dist/knockout',
		komapping:		'../../bower_components/knockout-mapping/knockout.mapping',
		jquery:			'../../bower_components/jquery/dist/jquery',
		text:			'../../bower_components/requirejs-text/text',
		sammy:			'../../bower_components/sammy/lib/sammy',
		'Sammy.JSON':	'../../bower_components/sammy/lib/plugins/sammy.json',
		'Sammy.Storage':'../../bower_components/sammy/lib/plugins/sammy.storage',
	},

	shim: {
		komapping: { deps: ['knockout'] },
	}

});

requirejs(['./app', './components/_loader', './routes'],

function(App){

	App.run('#/');
			
});