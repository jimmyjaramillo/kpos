'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

// Get list of products
exports.findAll = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var products = db.collection('products');

    products.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};

//Get products by query
exports.findbyQuery = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var products = db.collection('products');
    var str = req.params.query || '';

    console.log('DEBUG:', str);
    products.find({"name": {$regex: str}}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
};

//Get products by name and featured
exports.findbyNameandType = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var products = db.collection('products');
    var str = req.params.query || '';
    var typeproduct= req.params.type;
    console.log('DEBUG:', str, typeproduct);
    products.find({$or: [ { "name": {$regex: str} }, { typeproduct: true  } ] }).toArray(function(err, docs){
      console.log(docs);
      res.json(docs);
      db.close();
    });
  });
};