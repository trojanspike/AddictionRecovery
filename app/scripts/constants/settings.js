'use strict';

window.angular.module('app.constants',[])
.constant('apiInfo', {
/* url-main, markers, details */
    url : 'https://aa-finder-data.herokuapp.com/api/v1/data'

})
.constant('devinfo', {
    name : 'Lee Mc Kay',
    url : 'sites-ignite.co.uk',
    email : 'aafinder@sites-ignite.co.uk'
})
.constant('appinfo', {
    version : '2.1.8',
    buildDate : '04/11/2014'
});
