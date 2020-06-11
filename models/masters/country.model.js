const mongoose = require('mongoose');


const countrySchema = new mongoose.Schema({
	countryname:{
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

module.exports = Country = mongoose.model('Country',countrySchema);