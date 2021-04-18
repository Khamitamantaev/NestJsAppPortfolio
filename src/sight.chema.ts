var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sightSchema = new Schema({
   name:String,
   description :String,
   architect :String,
});
module.exports = mongoose.model('sight', sightSchema);


