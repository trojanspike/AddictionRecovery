var cheerio = require('cheerio'),
Meetings = $model('Meetings');
var Times = $model('Times');

Meetings.find().select('code details -_id').exec(function(er, doc){
	var Arr = [];
	doc.forEach(function(docv){
		var $ = cheerio.load(docv.details);
		var Days = $('table').eq(2).children().eq(0).children();
		var Times = $('table').eq(2).children().eq(1).children();
		var DAYS = {};
		Days.each(function(v, h){
			if( /.*\|.*/.test( Times.eq(v).html() ) ){
				// console.log( Times.eq(v).html() );
				DAYS[$(this).text()] = Times.eq(v).html().split('|');
			} else {
				if( Times.eq(v).html() !== '' ){
					DAYS[$(this).text()] = [Times.eq(v).html()];
				} else {
					DAYS[$(this).text()] = []; 
				}
			}
		});
		Arr.push( {code : docv.code, days : DAYS} );
	});
	Arr.forEach(function(val){
		var time = new Times(val); 
		time.save(function(err, doc){
			console.log(doc);
		});
	});
});
// T.save(); # http://localhost:3000/meetings/C81
