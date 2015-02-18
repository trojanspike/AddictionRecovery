var express = require('express'),
app = express(),
router = express.Router();
/*******/

/* Data */
router.get('/data' , function(req, res){

	$model('beta/index').find().exec(function(err, result){
		res.json( result );
	});

});

/* Data */
router.param('lat', function(a, b, next, val){
	if ( /^[\d-.]+$/.test(val) ){
		next();
	} else {
		next(new Error('11'));
	}
});
router.param('long', function(a, b, next, val){
	if ( /^[\d-.]+$/.test(val) ){
		next();
	} else {
		next(new Error('22'));
	}
});
router.param('limit', function(a, b, next, val){
	if ( /^\d{1,2}$/.test(val) ){
		next();
	} else {
		next(new Error('33'));
	}
});
router.get('/:lat/:long/:limit' , function(req, res){
	var _GeoMeetCodesRegex = '', i = 0;
	var Query =$model('geo/index').find({
		loc : {
			$near : [ req.params.lat,req.params.long ]
		}
	}).limit( req.params.limit ).select('code -_id');

	Query.exec(function(err, doc){
		for(i; i < doc.length; i++){
			console.log( doc[i].code );
			_GeoMeetCodesRegex += doc[i].code+'|';
		}
		$model('Meetings').find({code: {
			$regex : new RegExp( _GeoMeetCodesRegex.substr(0, _GeoMeetCodesRegex.length - 1) )
			} })
			.select('-_id -accessKey -__v').exec(function(err, data){
				res.send( data );
			});
	});
});



/******/
module.exports = router;
