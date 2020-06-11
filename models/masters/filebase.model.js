const mongoose = require('mongoose');


const filebaseSchema = new mongoose.Schema({
	filename:{
		type      : String,
	},
	status:{
		type      : String,
	},
},{
	timestamps:true,
});

module.exports = Filebase = mongoose.model('Filebase',filebaseSchema);