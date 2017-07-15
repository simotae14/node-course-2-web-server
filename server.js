const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// creo l'app
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
// setto come view engine hbs
app.set('view engine', 'hbs');

// creo il middleware
app.use((req, res, next) => {
  // data odierna
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// creo middleware per maintenance.hbs
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// creo il middleware per la cartella degli static
app.use(express.static(__dirname + '/public'));

// creo helper con la funzione che restituisce l'anno corrente
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// helper uppercase
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// creo la route
app.get('/', (req, res) => {
  // restituisco una stringa
  // res.send({
  //   name: 'Andrew',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

// about
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// projects
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

// bad
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


// inizializzo il server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
