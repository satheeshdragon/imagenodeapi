const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
	companyname:{
		type      : String,
		required  : true,
	},
	email:{
		type      : String
	},
	phone:{
		type      : String,
		required  : true,
	},
	address:{
		type      : String,
		required  : true,
	},
	pincode:{
		type      : String,
	},
	country:{
		type      : String,
	},
	state:{
		type      : String,
	},
	city:{
		type      : String,
	},
	logo:{
		type      : String,
	},
},{
	timestamps:true,
});

module.exports = Company = mongoose.model('Company',companySchema);