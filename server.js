const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

let port = process.env.PORT || 3000;


// set our application port
app.set('port', port);

app.use(morgan('dev'));

// app.use(express.static(path.join(__dirname, '/slider')));
app.use(express.static(path.join(__dirname, '/slider/SamHub_Model_Two')));
app.use(express.static(path.join(__dirname, '/slider')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/slider/SamHub_Model_Two/index.html'));
});

// route for handling 404 requests(unavailable routes
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.listen(app.get('port'), function() {
    console.log('listening on ', port)
});