var express = require('express'),
app = express();

app.use(express.static(__dirname+'/data_parsed/'));

var Getter = require('./dataGetter');
Getter.run();
setInterval(Getter.run, 604800);

app.listen( process.env.PORT );