var express = require('express'),
bodyParser = require('body-parser'),
app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', __dirname + '/App/Views');

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use(express.static(__dirname + '/public'));
/*******/
// Load global 
require(__dirname+'/App/Dependancies/env');
require(__dirname+'/App/Dependancies/mongoose');

/* locals */
require(__dirname+'/App/Helpers/ejs/conf')(app);

/********/
var server = require('http').Server(app);
var io = require('socket.io')(server, { serveClient: true, path : '/socket.io' });

// Routes
require(__dirname+'/App/routes')(app);
// Socket io
require(__dirname+'/App/Controllers/sockets/')(io);
/* Error Handling */
app.use(function(req, res, err){
	res.send('Error');
});

server.listen( process.env.PORT || 3000 );
