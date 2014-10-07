var request = require('request'),
express = require('express'),
app = express();

app.use(express.static(__dirname+'/data_parsed/'));

/*
All Marker data
http://www.alcoholicsanonymous.ie/markers.do?county=any&day=any
###
By Code
http://www.alcoholicsanonymous.ie/detail.do?id=L204
*/
//- request('http://www.alcoholicsanonymous.ie/markers.do?county=any&day=any', function(error, response, body){

	// console.log(error);
	// console.log(response);
	// console.log(body);

//- })

app.listen( process.env.PORT );