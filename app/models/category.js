// The Category model

var mongoose = require('mongoose')
   , Schema = mongoose.Schema
   , ObjectId = Schema.ObjectId;

var categorySchema = new Schema({
    name: { type: String, index: true },
    idFoursquare: { type: String, index: true },
    description: { type: String }
});
    
module.exports = mongoose.model('Category', categorySchema);