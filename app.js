
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var db = require('mongoskin').db('localhost:27017/whatdo'); 

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/projects/getlist.json', function(req, res){
  db.collection('project').find().toArray(function(err, result) {
    res.send(JSON.stringify(result));
  });
});

app.post('/users/getlist.json', function(req,res){
  db.collection('user').find().toArray(function(err, result) {
    res.send(JSON.stringify(result));
  });
});

app.post('/todos/getlist.json', function(req,res){
  db.collection('todo').find({project:req.body.project}).toArray(function(err, result) {
    res.send(JSON.stringify(result));
  });
});

app.post('/todos/save.json', function(req,res){
  db.collection('todo').insert(req.body,{safe:true},function(err,result){
    res.send({id: result[0]._id});
  });
});

app.post('/todos/update.json', function(req,res){
  db.collection('todo').update({_id: db.ObjectID.createFromHexString(req.body.id)},{$set: {status: req.body.status}});
  res.send(JSON.stringify("updated"));
});

app.post('/todos/delete.json', function(req,res){
  db.collection('todo').remove({_id: db.ObjectID.createFromHexString(req.body.id)});
  res.send(JSON.stringify("removed"));

});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
