const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.port || 5000
const request = require('request');
const doneAPI = "";

// API key pk_cee04a29e0f64d6da5f1b59cb58dcea9
function call_api(finishedAPI) {
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_cee04a29e0f64d6da5f1b59cb58dcea9', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
            console.log(body);
        if (res.statusCode === 200) {
            finishedAPI(body);
        }
    
    });    
}


// Set handlebars middleware 
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Set Handlebar routes
app.get('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    });
});

app.get('/about.html', function (req, res) {
    res.render('about');
});


app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server listening on port ' + PORT));

