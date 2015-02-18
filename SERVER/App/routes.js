module.exports = function(app){
	var Home = require(__dirname+'/Controllers/home');

	app.get('/', Home.index);
	app.get('/meetings', Home.run);
	app.get('/browse', Home.browse);
	app.get('/meetings/:code', Home.code);

	/* API DATA OUT */
	app.use('/data.json', require(__dirname+'/Controllers/api/v1.js'));
	app.use('/api/v1', require(__dirname+'/Controllers/api/v1.js'));

/* Beta services */
  app.use('/api/beta', require(__dirname+'/Controllers/api/beta.js'))

};
