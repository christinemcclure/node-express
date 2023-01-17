const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.port || 5000
const request = require('request');
const bodyParser = require('body-parser');
const doneAPI = "";
var msg = "";

// user body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// API key pk_cee04a29e0f64d6da5f1b59cb58dcea9
function call_api(finishedAPI, ticker) {
    if (ticker == null) {
        ticker = "FB";
    }
    request(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_cee04a29e0f64d6da5f1b59cb58dcea9`, { json: true }, (err, res, body) => {
        msg = "";
        if (err) {
            msg = "Error accessing API.";
            finishedAPI("");
        }

        if (res.statusCode === 200) {
            finishedAPI(body);
            console.log(body);
        }

        if (res.statusCode === 404) {
            msg = `Ticker ${ticker} does not exist.`;
            finishedAPI("");
        }

    });
}


// Set handlebars middleware 
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Set Handlebar GET route
app.get('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    });
});

//Set handlebars POST index route
app.post('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', {
            stock: doneAPI,
            message: msg
        });
    }, req.body.stock_ticker);

});

app.get('/about.html', function (req, res) {
    res.render('about');
});


app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server listening on port ' + PORT));

