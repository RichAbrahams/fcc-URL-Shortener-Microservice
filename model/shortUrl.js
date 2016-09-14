var mongoose = require('mongoose');
var shortId = require('shortid');

var urlSchema = mongoose.Schema({
	shortUrl: {
	    type: String,
	    unique: true,
	    default: shortId.generate
	},
  longUrl: {
    type: String,
  }
});

var urlModel = mongoose.model('Url', urlSchema);
module.exports = urlModel;
