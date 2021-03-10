const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');
const port = process.env.PORT || 3000;

const app = express();

// DEFINE PATH FOR EXPRESS CONFIG
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'vineet' 
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'different one',
        title: 'about page'   
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'help full teext aris hiere',
        title: 'Help Page',
        name: "Vineet"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(latitude, longitude, (error, forecastDate) => {
            if(error) {
                return res.send({ error: error });
            }

            res.send({
                forecast: forecastDate, 
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });
    } 
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => { // MATCH ANYTHING AFTER /HELP
    res.render('404', {
        title: '404',
        name: 'vineet',
        errorMessage: 'This is a good page to come by and look for help and then get lost'
    });
});

app.get('*', (req, res) => { // MATCH ANYTHING
    res.render('404', {
        title: '404',
        name: 'vineet',
        errorMessage: 'My 404 page'
    });
});

app.listen(port, () => console.log('server running on port ' + port));