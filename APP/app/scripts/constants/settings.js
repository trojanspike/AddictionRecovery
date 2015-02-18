'use strict';

window.angular.module('app.constants',[])
.constant('apiInfo', {
/* url-main, markers, details */
	url : 'http://aa-finder.sites-ignite.co.uk/api/v1-AR/',
	main : 'http://aa-finder.sites-ignite.co.uk',
	cachePath : 'uk.co.sites-ignite.aafinder-v1-AR-data'
})
.constant('devinfo', {
    name : 'Lee Mc Kay',
    url : 'sites-ignite.co.uk',
    email : 'AddictionRecovery@sites-ignite.co.uk'
})
.constant('appinfo', {
    version : '0.0.8',
    buildDate : '12/02/2015'
});
