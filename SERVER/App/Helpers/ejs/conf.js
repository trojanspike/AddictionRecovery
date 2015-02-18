module.exports = function(app){
/*---------------------------*/
app.locals.base = function(){
	return ($env() === 'local')?'http://localhost:3000':'http://aa-finder.herokuapp.com';
};
/*---------------------------*/
};
