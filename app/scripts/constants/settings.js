'use strict';

window.angular.module('app.constants',[])
.constant('apiInfo', {
/* url-main, markers, details */
	url : 'http://aa-finder.sites-ignite.co.uk/api/v1/',
	main : 'http://aa-finder.sites-ignite.co.uk',
	cachePath : 'uk.co.sites-ignite.aafinder-v1-data'
})
.constant('devinfo', {
    name : 'Lee Mc Kay',
    url : 'sites-ignite.co.uk',
    email : 'aafinder@sites-ignite.co.uk'
})
.constant('appinfo', {
    version : '2.2.0',
    buildDate : '19/11/2014'
});
