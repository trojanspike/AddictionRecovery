#!/usr/bin/env node

var methods = require('../methodsShare');

/* DO A GRUNT BUILD FIRST */

var fs = require('fs'), path = require('path');
/* bower_components/onsenui/build/css/onsenui.css
	= styles/css/onsenui.css
*/
/* bower_components/onsenui/build/css/onsen-css-components.css
	= styles/css/onsen-css-components.css
*/
	/* scan /css/folder -> get name and replace */
var Location = path.normalize(__dirname+'/../../www/');
var data = fs.readdirSync(Location+'styles/css/');
/* make ionic css file usable in index.html */
/* rename */
	data.forEach(function(val, key){
		if( /.*\.(onsenui|onsen-css-components).css$/.test(val) ){
			fs.renameSync( Location+'styles/css/'+val , Location+'styles/css/'+val.replace(/^.*\.(.*)\.css$/, '$1')+'.css' );
		}
	});

/* repath the link hrefs to target the newly named files */
var content = fs.readFileSync(Location+'index.html', {encoding:'utf8'});
content = content.replace('bower_components/onsenui/build/css/onsenui.css', 'styles/css/onsenui.css');
content = content.replace('bower_components/onsenui/build/css/onsen-css-components.css', 'styles/css/onsen-css-components.css');

fs.writeFileSync(Location+'index.html', content, {encoding:'utf8'});


/* Config changes app wide */
var Config = require('../../config.js');
