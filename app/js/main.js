requirejs.config({

	paths: {
		knockout:		'../../bower_components/knockout/dist/knockout',
		jquery:			'../../bower_components/jquery/dist/jquery',
		text:			'../../bower_components/requirejs-text/text',
		sammy:			'../../bower_components/sammy/lib/sammy',
		'Sammy.JSON':	'../../bower_components/sammy/lib/plugins/sammy.json',
		'Sammy.Storage':'../../bower_components/sammy/lib/plugins/sammy.storage',
	},

});

requirejs(['./app', './viewmodels/_loader', './components/_loader'],

function(App){

	App.run('#/');
			
});