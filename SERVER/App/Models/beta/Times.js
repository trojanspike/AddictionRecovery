var mongoose = require('mongoose');
var TimesSchema = mongoose.Schema({
	code 		: 	String,
	days 		: 	Object
});


module.exports = mongoose.model('time', TimesSchema);
