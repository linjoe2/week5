var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://linjoe:6007818@localhost/bullitin";

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended: true
}));

//postgres server

function serversend(Name, Email, Message) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('INSERT INTO message_board VALUES ($1, $2, $3)', [Name, Email, Message], function(err, result) {
			//call `done()` to release the client back to the pool
			done();

			if (err) {
				return console.error('error running query', err);
			}
			console.log('placed in database:');
			console.log(Name + ' ' + Email);
			console.log(Message);
		});
	});
}

//-----------------

/* GET home page. */
app.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Bullitin board'
	});
});

app.get('/addmessage', function(req, res, next) {
	res.render('addmessage', {
		title: 'Bullitin board'
	});
});


module.exports = router;


app.get('/hello', function(req, res) {
	res.send('Hello World!');
});
//-------------------

/*add message*/
app.post('/addmessage1', function(req, resp) {
	var Name = req.body.Name;
	var Email = req.body.Email;
	var Message = req.body.Message;
	// var user = JSON.stringify(newUser);

	serversend(Name, Email, Message)
	console.log(Name + Email + Message)
		// users.push(newUser)
	resp.send(Name + Email + Message)
});

//-------------------
/*read all messages*/
app.get('/messages', function(req, resp) {
	console.log('test 1')
		// resp.writeHead(200, {
		// 	'Content-Type': 'text/plain'
		// })
		// // for (var i = users.length - 1; i >= 0; i--) {
		// 	resp.write('Firstname: ');
		// // };
		// resp.end();
	var results = [];

	// Grab data from http request
	var data = {
		text: req.body.text,
		complete: false
	};

	// Get a Postgres client from the connection pool
	pg.connect(conString, function(err, client, done) {
		// Handle connection errors
		if (err) {
			done();
			console.log(err);
			return resp.status(500).json({
				success: false,
				data: err
			});
		}
		// SQL Query > Select Data
		var query = client.query("SELECT * FROM message_board");
		console.log('test')

		// Stream results back one row at a time
		query.on('row', function(row) {
			results.push(row);
		});

		// After all data is returned, close connection and return results
		query.on('end', function() {
			done();
			console.log(results)
			
				console.log('test')
				resp.writeHead(200, {
					'Content-Type': 'text/plain'
				})
				for (var i = 0; i <= results.length - 1; i++) {
				resp.write('<h3>' + results[i].name + '(' + results[i].email +') </h3>' + 
					'<p>' + results[i].message + '</p>');
				 };
			resp.end();

			// return resp.json(results);
		
			// return resp.write('test')
		});


	});
});

//---------------------



app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});