define(['sammy', 'Sammy.JSON', 'Sammy.Storage'],

function(Sammy){

	// Returns the Sammy Application instance
	var vocApp = Sammy('#vocApp').use('Storage');

	vocApp.store = new Sammy.Store({name: 'VocApp', element: '#vocApp', type: 'local'});
	
	return vocApp;

});