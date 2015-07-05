var env = 'dev';

console.log('Connected ENV ['+env+']');
var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    conf = require('./config/nodeappconfig-'+env+'.js'),
    express = require('express'),
    app = express();

var db = new Db(conf.config.db_config.dbname,
                new Server(conf.config.db_config.host, conf.config.db_config.port,
                           { auto_reconnect: true,
                             poolSize: 1}),
                { w: 1 });

console.log('--->'+JSON.stringify(db));

var record = {
    'name' : 'sachin',
    'age' : 34,
    'desc' : 'test description'
};


var idVal = function(){
    var counter = new Date().getTime();

    return function(){
        return counter += 1;
    };
}();

var getDummyResponse = function(res){
    db.open(function(err, client){

        if(conf.config.db_config.authRequired){
                db.authenticate(conf.config.db_config.username, conf.config.db_config.password, function(err, result) {
                    console.log('err='+err);
                    if(err){
                            throw err;
                    }else{
                        console.log('Mongo DB authentication successful....');
                    }
                });
        }

        client.createCollection("t1", function(err, col) {
             client.collection("t1", function(err, col) {
                record._id = idVal();
                col.insert(record, function() {
                    res.send('Record inserted successfully.'+JSON.stringify(record));
                });

             });
        });
    });
};

 //db.t1.insert(JSON.parse(JSON.stringify(record)), {w:1, safe:false});

 app.get('/dummy', function(req, res){
        getDummyResponse(res);
 });
 app.get('/', function(req, res){
        res.send('Welcome');
 });
 app.listen(8085);