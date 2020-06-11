const mongoose = require('mongoose');


const citySchema = new mongoose.Schema({
	cityname:{
		type      : String,
		required  : true,
		unique    : true,
		trim      : true,
		minlength : 3,
	},
	aliasname:{
		type      : String,
	},
},{
	timestamps:true,
});

module.exports = City = mongoose.model('City',citySchema);