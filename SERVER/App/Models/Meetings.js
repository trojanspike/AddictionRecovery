var mongoose = require('mongoose');
var MeetingSchema = mongoose.Schema({
	name 			: 	String,
	town 			: 	String,
	lat			: 	Number,
	lng 			:	Number,
	description : 	String,
	code			:	String,
	details		:	String,
	accessKey	:	String
});


module.exports = mongoose.model('meeting', MeetingSchema);
