define(['sammy'],

function(Sammy){
	
	// Gets the application instance
	var App = Sammy('#vocApp');

	// Define application routes

	App.route('get', '#/', function(ctx){
		
	});

	/*return [
		['get', '#/', function() { alert("hola"); }],
		['get', '#/word/:id', function() { alert("word"); }]
	];*/

});