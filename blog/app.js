var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg')
var Sequelize = require('sequelize');
var router = express.Router();
var sass = require('node-sass');
sass.render({
  file: scss_filename,
  [, options..]
}, function(err, result) { /*...*/ });

//sessions
// app.use(session({
// 	secret: 'ssshhhhh'
// }));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false
	}
}))

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
var Sequelize = require('sequelize');
var sequelize = new Sequelize('stoner', 'linjoe', null, {
	host: 'localhost',
	dialect: 'postgres'
});
var user = sequelize.define('user', {
	username: {
		type: Sequelize.STRING,
		unique: true,
	},

	password: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true,
		}
	},

	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true,
		},
	}
});

var message = sequelize.define('message', {
	userid: {
		type: Sequelize.INTEGER,
	},
	messaget: {
		type: Sequelize.STRING,
		unique: true,
	},

	message: {
		type: Sequelize.TEXT,

	},
	comments: {
		type: Sequelize.STRING,
	}
})

var comments = sequelize.define('comment', {
	commentid: {
		type: Sequelize.INTEGER,
	},
	messageid: {
		type: Sequelize.STRING
	},
	userid: {
		type: Sequelize.STRING
	},
	comment: {
		type: Sequelize.TEXT
	}
})


// GET pages
app.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Blog'
	});
});

app.get('/users/new', function(req, res, next) {
	sess = req.session
	if (sess.email) {
		res.render('error', {
			title: 'user already loged in: ' + sess.email
		})
	} else {
		console.log('user session requested')
		res.render('register', {
			title: 'Register'
		});
	}
});

app.get('/post/new', function(req, res, next) {
	sess = req.session
	if (sess.email) {
		console.log('user session requested')
		res.render('newmessage', {
			title: ' New messages'
		});
	} else {
		res.render('error', {
			title: 'user login failed'
		})
	}
});


module.exports = router;


//---------------------

//login
app.post('/users/login', function(req, res, next) {
	sess = req.session;
	var username = req.body.username
	var password = req.body.password
	console.log('user login: ' + username)

	user.findAll().then(function(users) {
		var data = users.map(function(post) {
			return {
				id: post.dataValues.id,
				username: post.dataValues.username,
				password: post.dataValues.password,
				email: post.dataValues.email
			};
		});
		var chck = 0

		for (var i = 0; i <= data.length - 1; i++) {
			if (username === data[i].username) {
				console.log('user signing in: ' + data[i].username)
				if (password === data[i].password) {
					console.log('correct password')
					sess.email = data[i].email
					console.log('session created ' + sess.email);
					res.redirect('/users/' + data[i].id)
						// res.end('/post/' + data[i].id)
					var chck = 1
				} else {
					if (chck === 0 && data.length - 1 === i) {
						res.render('error', {
							title: 'incorrect password'
						})
					}
				}
			} else {
				if (chck === 0 && data.length - 1 === i) {
					res.render('error', {
						title: 'incorrect username'
					})
				}
			}
		};


	});

	console.log('------------')


	// res.end('done')

})

// res.redirect

//user check
app.get('/users/login', function(req, res, next) {
	sess = req.session
	if (sess.email) {
		console.log('user session requested')
		res.send(true)
	} else {
		res.send(false)
	}
})

//register

app.post('/users', function(req, res, next) {
	sess = req.session;
	var username = req.body.username
	var email = req.body.email
	var password = req.body.password
	console.log('new user!')
	console.log('usr: ' + username + ' pwd: ' + password + ' email: ' + email)
	var username = sess.username
	user.create({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	});


	sess.email = req.body.email
	if (sess.email) {
		console.log('session created')
	}
	console.log('------------')
	res.redirect('/users/' + data[i].id)
	res.send()
})

//---------------------

//loged in homepage
app.get('/users/:name', function(req, res, next) {
	sess = req.session;
	user.findAll().then(function(users) {
		var data = users.map(function(post) {
			return {
				id: post.dataValues.id,
				username: post.dataValues.username,
				password: post.dataValues.password,
				email: post.dataValues.email
			};
		});
		if (sess.email) {
			var check = 0
			for (var i = 0; i <= data.length - 1; i++) {
				if (sess.email === data[i].email) {
					if (req.params.name == data[i].id) {
						res.render('message-usr', {
							title: 'hello ' + sess.email
						})
						var check = 1
					} else {
						if (check === 0) {
							res.render('error', {
								title: 'incorrect user'
							})
							console.log('incorrect user bounced')
						}
					}

				} else {
					if (i + 1 === data.length && check === 0) {
						res.render('error', {
							title: 'incorrect user'
						})
						console.log('incorrect user bounced')
					}
				}
			}
		} else {
			res.render('error', {
				title: 'user not logged in'
			})
			console.log('unknown user bounced')
		};
	});
});
// all messages
app.get('/post/', function(req, res, next) {
	sess = req.session;
	user.findAll().then(function(users) {
		var data = users.map(function(post) {
			return {
				id: post.dataValues.id,
				username: post.dataValues.username,
				password: post.dataValues.password,
				email: post.dataValues.email
			};
		});
		if (sess.email) {
			var check = 0
			for (var i = 0; i <= data.length - 1; i++) {
				if (sess.email === data[i].email) {
					res.render('message', {
						title: 'hello ' + sess.email
					})
					var check = 1
				} else {
					if (i + 1 === data.length && check === 0) {
						res.render('message', {
							title: 'incorrect user'
						})
						console.log('incorrect user bounced')
					}
				}
			}
		} else {
			res.render('error', {
				title: 'user not logged in'
			})
			console.log('unknown user bounced')
		};
	});
});


//message in
app.post('/message', function(req, res, next) {
	sess = req.session;
	var messagetitle = req.body.messagetitle
	var messagebody = req.body.message
	console.log('new post: ' + messagetitle)
	console.log('------------')

	user.findAll().then(function(users) {
		var data = users.map(function(user) {
			return {
				id: user.dataValues.id,
				email: user.dataValues.email,
			};
		});
		console.log(data)
		for (var i = 0; i <= data.length - 1; i++) {
			console.log(data[i].email)
			if (data[i].email === sess.email)
				message.create({
					userid: data[i].id,
					messaget: messagetitle,
					message: messagebody,
				})
		};

	});

	res.render('index', {
		title: 'Blog'
	});
})

//message out
app.get('/message', function(req, res, next) {
	sess = req.session;
	var messagetitle = req.body.messagetitle
	var messagebody = req.body.message
	console.log('new post: ' + messagetitle)
	console.log('------------')

	user.findAll().then(function(users) {
		var usr = users.map(function(user) {
			return {
				id: user.dataValues.id,
				usr: user.dataValues.username,
				email: user.dataValues.email,
			};
		});
		message.findAll().then(function(messages) {
			var msg = messages.map(function(message) {
				return {
					id: message.dataValues.id,
					title: message.dataValues.messaget,
					msg: message.dataValues.message,
					usr: message.dataValues.userid,
					cmtid: message.dataValues.comments
				};
			});
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			})

			for (var i = 0; i <= msg.length - 1; i++) {
				for (var b = usr.length - 1; b >= 0; b--) {
					if (usr[b].id === msg[i].usr) {
						var username = usr[b].usr
						console.log(username)
					}
				};
				res.write('<h2>' + msg[i].title + '</h2><h3>' + username + '</h3><br>' + msg[i].msg);
			};
			res.end();
		});
	});
	// res.send('test')
});

//message from user
app.get('/message-usr', function(req, res, next) {
	sess = req.session;
	var messagetitle = req.body.messagetitle
	var messagebody = req.body.message
	console.log('new post: ' + messagetitle)
	console.log('------------')

	user.findAll().then(function(users) {
		var usr = users.map(function(user) {
			return {
				id: user.dataValues.id,
				usr: user.dataValues.username,
				email: user.dataValues.email,
			};
		});
		message.findAll().then(function(messages) {
			var msg = messages.map(function(message) {
				return {
					id: message.dataValues.id,
					title: message.dataValues.messaget,
					msg: message.dataValues.message,
					usr: message.dataValues.userid,
					cmtid: message.dataValues.comments
				};
			});
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			})

			for (var i = 0; i <= msg.length - 1; i++) {
				for (var b = usr.length - 1; b >= 0; b--) {
					if(usr[b].id === msg[i].usr) {
						var username = usr[b].usr
						var email = usr[b].email
						console.log(username)
					}
				};
				if (email === sess.email) {
					res.write('<h2>' + msg[i].title + '</h2><h3>' + username + '</h3><br>' + msg[i].msg);
				}

			};
			res.end();
		});
	});
	// res.send('test')
});



//comment


sequelize.sync().then(function() {
	app.listen(3000, function() {
		console.log('Example app listening on port 3000!');
	});
})