var express = require('express');
var app = module.exports = express();
var router = express.Router();
var Category = require('../app/models/category');


app.get('/categories', function (req, res, next) {
    
    Category.find().exec(function (err, locations) {
        if (err) {
            return res.json(500, err);
        }
        
        res.json(200, locations);
    });
});

app.get('/categories/:id', function (req, res) {
    var category = null;
    
    Category.findOne({ '_id'  : req.params.id }, function (err, result) {
        if (err) throw err;
        console.log(result);
        
        if (result != null)
            res.send(result);
    });
    
    Category.findOne({ 'categories.id' : req.params.id }, function (err, result) {
        if (err) throw err;
        console.log(result);
        
        for (var i = 0; i < result._doc.categories.length; i++) {
            
            if (result._doc.categories[i].id == req.params.id) {
                res.send(result._doc.categories[i]);
            }
        }
       
    });
});

app.get('/categories', function (req, res, next) {
    
    Category.find().exec(function (err, locations) {
        if (err) {
            return res.json(500, err);
        }
        
        res.json(200, locations);
    });
});

app.get('/categories/:id', function (req, res) {
    var category = null;
    
    Category.findOne({ '_id'  : req.params.id }, function (err, result) {
        if (err) throw err;
        console.log(result);
        
        if (result != null)
            res.send(result);
    });
    
    Category.findOne({ 'categories.id' : req.params.id }, function (err, result) {
        if (err) throw err;
        console.log(result);
        
        for (var i = 0; i < result._doc.categories.length; i++) {
            
            if (result._doc.categories[i].id == req.params.id) {
                res.send(result._doc.categories[i]);
            }
        }
       
    });
});
