const mongoose = require('mongoose');


const stateSchema = new mongoose.Schema({
	statename:{
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

module.exports = State = mongoose.model('State',stateSchema);