var mongoose = require('mongoose');
mongoose.set('debug', true);

var PositionSchema = mongoose.Schema({
	code : { type : String, index : true },
	loc : {type : [Number], index : '2d'}
});

module.exports = mongoose.model('position', PositionSchema);
/** 
module.exports = function(callb){


Position.find({loc :{ // 54.1956600,-6.3942300
	'$near' : [54.1956600, -6.3942300]
}}).select('code').limit(4).exec(callb);

	$model('Meetings').find().select('code lat lng').exec(function(err, doc){


		doc.forEach(function(val){
			new Position({
				code : val.code,
				loc : [val.lat, val.lng]
			}).save();
		});

		callb([]);

	});

}

 **/
