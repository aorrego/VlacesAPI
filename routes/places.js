var express = require('express');
var app = module.exports = express();
var Place = require('../app/models/place');

app.post('/places', function (req, res) {
    
    console.log("POST: ");
    console.log(req.body);
    
    var place = new Place(req.body);
    place.save(function (err) {
        if (err)
            console.log('meow');
    });
    
    return res.send("OK: " + place._id);
});

app.get('/places', function (req, res, next) {
    
    if (req.query.all != null && req.query.all == "true") {
        
        Place.find( { 'categories.name' : { $in: [ 'Food & Drink Shop', 'Arts & Entertainment', 'Event', 'Food', 'Travel & Transport', 'Nightlife Spot', 'Pub'] } } , { 'extra' : false }).exec(function (err, locations) {
            if (err) {
                return res.json(500, err);
            }
            
            console.log(locations.length);
            
            res.json(200, locations);
        });
    }
    else {
        var limit = req.query.limit || 10;
        
        // we need to convert the distance to radians the raduis of Earth is approximately 6371 kilometers   
        var maxDistance = req.query.distance || 5; // in kms
        maxDistance /= 6371;
        
        var coords = [req.query.lat || 0 , req.query.lng || 0];
        
        Place.find({ "location.loc" : { $near : coords, $maxDistance: maxDistance } }, { 'categories.name' : { $in: ['Food & Drink Shop', 'Arts & Entertainment', 'Event', 'Food', 'Travel & Transport', 'Nightlife Spot', 'Pub'] }}, { 'extra' : false })
        .limit(limit).exec(function (err, locations) {
            if (err) {
                return res.json(500, err);
            }
            
            res.json(200, locations);
        });
    }
})

app.get('/places/:id', function (req, res, next) {
    Place.findOne({ '_id'  : req.params.id }, { 'extra' : false } , function (err, result) {
        if (err) throw err;
        console.log(result);
        
        if (result != null)
            res.send(result);
    });
})

app.delete('/places/:id', function (req, res) {
    var places = db.collection('events');
    places.removeById(req.params.id, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

