var mongoose = require('mongoose');
mongoose.set('debug', true);

var PositionSchema = mongoose.Schema({
	code : { type : String, index : true },
	loc : {type : [Number]/*long,lat*/, index : '2d'}
});

module.exports = mongoose.model('position', PositionSchema);
/** 
module.exports = function(callb){


Position.find({loc :{ //long:1,lat:2 -6.3942300, 54.1956600
	'$near' : [-6.3942300, 54.1956600]
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

db.positions.ensureIndex( { code: 1 }, { unique: true, dropDups: true } )
db.positions.find({
 loc : {
   $near : [-6.3583374,53.3841475]   
  }    
}).limit(3)
 **/
