const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// keep track of how your server is working
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// stops everything after from executing
// middleware is executed in the order that you use, so you will be able to see help page.
// app.use((req, res, next) => {
// 	res.render('maintenence.hbs');
// });

// gets the html template and makes an endpoint called /public
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	// res.send('<h1>hello express!</h1>');
	// res.send({
	// 	name: 'Shaun',
	// 	likes: [
	// 		'Dancing',
	// 		'Cities'
	// 	]
	// })
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	})
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

