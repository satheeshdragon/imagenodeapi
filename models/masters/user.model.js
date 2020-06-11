const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	username:{
		type      : String,
		required  : true,
		unique    : true,
		trim      : true,
		minlength : 3,
	},
	password:{
		type      : String,
		required  : true,
	},
},{
	timestamps:true,
});

module.exports = User = mongoose.model('User',userSchema);