const router = require('express').Router();
const multer  = require('multer');
const path = require('path');

let Filebase = require('../../models/masters/filebase.model');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


router.route('/').get((req,res) => {
	// Country.find()
	// 	.then(country => res.json(country))
	// 	.catch(err => res.status(400).json('Error: ' +err));
	res.render('index')
});

router.route('/upload').post((req,res) => {	
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
    	// console.log(req.file);

      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
      	/*  */
      		const filename   = req.file.filename;
			const status   	 = '1';

			const filebase = new Filebase({
				filename,
				status,
			});

			filebase.save()
				.then(() => res.json('Filebase Added'))
				.catch(err => res.status(400).json('Error: ' +err));
      	/*  */
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

router.route('/filebase').get((req,res) => {
	Filebase.find()
		.then(filebase => res.json(filebase))
		.catch(err => res.status(400).json('Error: ' +err));
});




module.exports = router;