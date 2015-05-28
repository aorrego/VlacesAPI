// The Place model

var mongoose = require('mongoose')
   , Schema = mongoose.Schema
   , ObjectId = Schema.ObjectId;

var placeSchema = new Schema({
    name: { type: String, index: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },    
    contact: {
        website: { type: String },
        phone: { type: String },
        social: {
            facebook: { type: String },
            twitter: { type: String },
            instagram: { type: String }               
        }
    },
    location: {
        loc: { type: [Number], index: '2d' },
        address: String,
        city: String,
        country: String,
        postalCode: String,
        state: String
    },
    schedule: {
        hour: [{ day: String, hourRange: String }]
    },
    payment: [ { name: String, description: String }]
});

placeSchema.set('collection', 'places');
module.exports = mongoose.model('places', placeSchema);   