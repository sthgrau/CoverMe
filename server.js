var express = require('express');
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
 
var mgo = require('mongodb').MongoClient;
var Logger = require('mongodb').Logger;
var db;
var dbc;
var dbname = 'coverme';
var colname = 'userdata';
var dbip = ( process.env.DBS ) ? process.env.DBS : "localhost";
var url = 'mongodb://' + dbip + ':27017/' + dbname;
mgo.connect(url, function(err, cdb) {
    if (err) throw err;
    db = cdb;
    db.listCollections({name: colname}).next(function(lerr, lres) {
        if ( ! lres) { 
            db.createCollection(colname, function(cerr, cres)  {
                if (cerr) throw err;
            });
        }
        dbc = db.collection(colname);
     })
});

var log4js = require('log4js');
logger = log4js.getLogger();
logger.level = 'debug';

app.get('/db', function (req, res) {
  logger.info(req.query);
  var query = {};
  if ( req.query.user ) {
    logger.info(req.query.user);
    query.user = req.query.user;
    dbc.find(query).sort({"timestamp": -1}).toArray(function(err, dbres) {
        if (err) throw err;
        if ( dbres.length > 0 ) {
            if ( req.query.item ) {
                var out = [];
                for ( var i=0; i < dbres[0].lines.length; i++ ) {
                    var rec = dbres[0].lines[i];
                    if ( rec.id.search(req.query.item) > -1 ) {
                        out.push(rec);
                    }
                }
                res.send(out);
            }
            else {
                res.send({"font": dbres[0].font, "lines": dbres[0].lines});
            }
        }
        else {
            res.send("{}");
        }
    });
  }
})

app.post('/db', function (req, res) {
  var body = req.body;
  console.log(typeof(body));
  req.body.timestamp = new Date();
  db.collection(colname).insertOne(body, {"bypassDocumentValidation": true}, function(err, res) { if (err) throw err; });
  
  res.set('Content-Type', 'text/plain')
  res.send(`You sent stuff to Express`)
})

app.get('/hw', function (req, res) {
  res.send('Hello World');
})

app.use('/', express.static(__dirname))
 
app.listen(8088)
