var mongoose = require('mongoose');
var MeetingSchema = mongoose.Schema({
	name 		: 	String,
	town 		: 	String,
	lat			: 	Number,
	lng 		:	Number,
	description : 	String,
	code		:	String,
	details		:	String,
	accessKey	:	String
});

MeetingSchema.virtual('bla').get(function(){
	return this.town;
});

MeetingSchema.methods.bark = function(){
	console.log( this.bla );
};

module.exports = mongoose.model('meeting', MeetingSchema);
