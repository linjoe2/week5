var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg')
var Sequelize = require('sequelize');
var router = express.Router();

//sessions
app.use(session({secret: 'ssshhhhh'}));
var sess;

//view engine + static files
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

//bodyparser
app.use(bodyParser.urlencoded({
	extended: true
}));

// sequelize
var sequelize = new Sequelize('postgres://linjoe:6007818@localhost/stoner');



//postgres server
// GET pages
app.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Blog'
	});
});

app.get('/users/new', function(req, res, next) {
	res.render('register', {
		title: 'Register'
	});
});

app.get('/users/login', function(req, res, next) {
	res.render('login', {
		title: 'login'
	});
});

app.get('/post', function(req, res, next) {
	res.render('message', {
		title: 'Messages'
	});
});

app.get('/post/new', function(req, res, next) {
	res.render('newmessage', {
		title: ' New messages'
	});
});

module.exports = router;


//---------------------

//login
app.post('/users/login', function(req,res,next) {
	var username = req.body.username
	var password = req.body.password
	console.log('user login: ' + username)
	console.log('------------')
	res.render('index', {
		title: 'Blog'
	});
})

//user check
app.get('/users', function(req,res,next){
	sess=req.session
	if(sess.email) {
		console.log('user session requested')
		res.send(sess.email)
	}else {
		res.send('user login failed')
	}

})

//register

app.post('/users', function(req,res,next) {
	sess=req.session;
	var username = req.body.username
	var email = req.body.email
	var password = req.body.password
	console.log('new user!')
	console.log('usr: ' + username + ' pwd: ' + password + ' email: ' + email)
	var username = sess.username
	sess.email = req.body.email
	if(sess.email) {
		console.log('session created')
	}
	console.log('------------')
	res.send()
})

//---------------------

//message
app.post('/message', function(req,res,next) {
	var messagetitle = req.body.messagetitle
	var message = req.body.message
	console.log('new post: ' + messagetitle)
	console.log('------------')
	res.render('index', {
		title: 'Blog'
	});
})
//comment



app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});