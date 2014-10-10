var express = require('express'),
app = express();

app.use(express.static(__dirname+'/data_parsed/'));

var Getter = require('./dataGetter');
Getter.run();
setInterval(Getter.run, 604800000); // 7 days
//-setInterval(Getter.run, 300000);

app.listen( process.env.PORT );