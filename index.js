const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.port || 5000

const otherstuff="this is other stuff..."

// Set handlebars middleware 
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Set Handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});


app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server listening on port ' + PORT));

