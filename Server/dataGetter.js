var request = require('request'),
    fs = require('fs'),
    eyes = require('eyes'),
    xml2js = require('xml2js');
var parser = new xml2js.Parser();
parser.on('end', function(result) {
    // eyes.inspect(result);
    fs.writeFile(__dirname + '/data_request/markers.json', JSON.stringify( result ) ,'utf8', function(){
        GetCodes();
    });
});

var GetCodes, CompleteMove;

module.exports.run = function(){
    request('http://www.alcoholicsanonymous.ie/markers.do?county=any&day=any', function(error, response, body){
        if(error){
            return null;
        } else {
            parser.parseString(body);
        }
    })
};

CompleteMove = function(){
    var Stamp = new Date().getTime().toString();
    fs.renameSync(__dirname+'/data_parsed/data.json', __dirname+'/data_request/data-'+Stamp+'-.json');
    fs.renameSync(__dirname+'/data_request/allData.json', __dirname+'/data_parsed/data.json');
};

GetCodes = function(){
    var CodeData = {};
    var Markers = JSON.parse( fs.readFileSync(__dirname+'/data_request/markers.json', {encoding:'utf8'}) ).markers.marker;
    var requestComplete = 0, Complete;

    Complete = function (){
        fs.writeFile(__dirname + '/data_request/allData.json', JSON.stringify( CodeData ) ,'utf8', function(){
            CompleteMove();
        });
    };

    (function NEXT(){
        var Code = Markers[requestComplete].$.code;
        CodeData[Code] = Markers[requestComplete].$;

        request('http://www.alcoholicsanonymous.ie/detail.do?id='+Code, function(error, response, body){
            if(error){
                return null;
            } else {
                CodeData[Code].details = body;
                if(requestComplete === (Markers.length - 1) ){
                    console.log('@complete');
                    Complete();
                } else {
                    console.log('@next');
                    requestComplete ++;
                    NEXT();
                }
            }
        });
    })();

};