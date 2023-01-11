const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process

// Set handlebars middleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set Handlebar routes
app.get('/', function (req, res) {
    res.render('home');
});


app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server listening on port' + PORT));

