var express = require('express'),
app = express(),
router = express.Router();
/********/

var showData = function(req, res){
	var ObjRenerder = {};
	$model('Meetings').find({})
	.select('name town lat lng description code details -_id')
	.exec(function(err, doc){
		for( var i in doc ){
			// console.log( doc[i].bla );
			// console.log( doc[i].bark() );
			ObjRenerder[doc[i].code] = doc[i];
		}
		res.json(ObjRenerder);
	});
}

/*********/
router.get('/', showData);

/********/
router.get('/data', showData);
/********/
/* 53.722881 / -6.881348 */
//- router.param('lat', //);
/* Must be long, lat storage */
router.get('/:lat/:long/:limit', function(req, res){
	var _GeoMeetCodesRegex = '', i = 0;
	$model('geo/index')
	.find({loc:{$near : [req.params.lat,req.params.long]}}).limit( req.params.limit )
	.select('code -_id')
	.exec(function(err, doc){
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
module.exports = router;
