/*******/
var mongoose = require('mongoose');

switch($env()){
	case 'local':
		mongoose.connect('mongodb://127.0.0.1/aa-finder');
	break;
	default:
		mongoose.connect( process.env.MONGO_DB || 'mongodb://127.0.0.1/aa-finder' );
}

global['$Schema'] = function(obj){
	return new mongoose.Schema(obj);
};
global['$model'] = function(model){
	return require(__dirname+'/../Models/'+model);
};
