'use strict';

window.angular.module('app.constants',[])
.constant('apiInfo', {
/* url-main, markers, details */
    url : 'https://aa-finder-data.herokuapp.com/data.json'

})
.constant('devinfo', {
    name : 'Lee Mc Kay',
    url : 'sites-ignite.co.uk',
    email : 'aafinder@sites-ignite.co.uk'
})
.constant('appinfo', {
    version : '2.1.0-r',
    buildDate : '13/10/2014'
});
