const express    = require("express");
const cors       = require("cors");
const mongoose   = require("mongoose"); 
// const fileUpload = require('express-fileupload');
const ejs 		 = require('ejs');

/* */
// const bodyParser = require('body-parser');
// const path = require('path');
// const crypto = require('crypto');
const multer = require('multer');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');
/* */

require('dotenv').config();

const app      = express();
const port     = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(fileUpload());

// app.use(bodyParser.json());
// app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(express.static('./public'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true,useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("SD INVERT_PRO connection establish Successfully");
})

/* MASTER INI */
const companyRouter     = require('./routes/masters/company');
const usersRouter       = require('./routes/masters/users');
const countryRouter     = require('./routes/masters/country');
const fileuploadRouter  = require('./routes/masters/fileupload');
const uploadRouter      = require('./routes/masters/upload');
// const stateRouter       = require('./routes/masters/state');
// const cityRouter        = require('./routes/masters/city');

/* MASTER CALL */
app.use('/company',companyRouter);
app.use('/users',usersRouter);
app.use('/country',countryRouter);
app.use('/fileupload',fileuploadRouter);
app.use('/upload',uploadRouter);
// app.use('/state',stateRouter);
// app.use('/city',cityRouter);


app.listen(port, function() {
	console.log("SD Server listening on port: " + port);
});