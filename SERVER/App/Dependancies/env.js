var os = require('os');
$env = function(){

	switch(os.hostname()){
		case 'manjaro-home-0684':
			return 'local';
		break;
			default:
				return 'live';
	}

};

/*
module.exports.__main = function(hostname){

	switch(hostname){
		case 'manjaro-home-9867':
			return 'local';
		break;
		default:
			return 'live';
	}

};
*/
