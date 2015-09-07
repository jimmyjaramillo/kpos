'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Configure mongo access
var MongoClient,
    url = config.mongo.uri;

MongoClient = require('mongodb').MongoClient;

/**
 * Get list of products
 * /api/products (all products)
 * /api/products?_id=1 (only product with id = 1)
 * /api/products?query=algo (only product with name = algo)
 * /api/products/:filter products by filter
 */
exports.findProducts = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var products = db.collection('products');

    var q = {};

    if(req.query && req.query._id){
      products.findOne({_id: parseInt(req.query._id)}, function(err, doc){
        res.json(doc);
        db.close();
      });
      return;
    }else if(req.query && req.params.query){
      q = {'name': {$regex: req.params.query}};
    }

    if(req.params && req.params._filter){
      var key = req.params._filter;
      q[req.params._filter] = true;
    }

    products.find(q).toArray(function(err, docs){
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
    var typeproduct= req.params.typeproduct;
    console.log('DEBUG:', str.trim().length, typeproduct);
    var query;
    if(str.trim().length===0){
      if(typeproduct==="featured"){
        query= {"featured": true };
      }else{
        query= {"onSale": true };
      }
    }else{
      if(typeproduct==="featured"){
        query= {$and: [ { "name": {$regex: str} }, { "featured": true  } ] };
      }else{
        query= {$and: [ { "name": {$regex: str} }, { "onSale": true  } ] };
      }
    }
    products.find(query).toArray(function(err, docs){
        console.log(docs);
        res.json(docs);
        db.close();
      });
  });
};
