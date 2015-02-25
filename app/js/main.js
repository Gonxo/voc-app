requirejs.config({

	paths: {
		'knockout':		'../../bower_components/knockout/dist/knockout',
		'jquery':		'../../bower_components/jquery/dist/jquery',
		'sammy':		'../../bower_components/sammy/lib/sammy',
		'text':			'../../bower_components/requirejs-text/text',
	},

});

requirejs(['./app', './viewmodels/_loader', './components/_loader'],

function(App){

	App.run('#/');
			
});