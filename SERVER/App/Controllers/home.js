module.exports.index = function(req, res){
	res.render('index', { title : 'AA Finder App'});
}

var cheerio = require('cheerio'),
Meetings = $model('Meetings');

module.exports.run = function(req, res){
	Meetings.find().select('code -_id').exec(function(err, doc){
		res.render('meetings/index', {details:doc});
		// res.json(doc);
	});
}

module.exports.browse = function(req, res){

	res.render('browse', {title : 'Browse', env : $env(), host : require('os').hostname() });

};

module.exports.code = function(req, res){
	Meetings.findOne({code:req.params.code}).select('details -_id').exec(function(err, doc){
		var $ = cheerio.load(doc.details);		
		res.send( $.html() );
	});
}
