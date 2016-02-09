app.get('/home', function (request, response) {
	response.render('index', { z: 3 } );
});