const router = require('express').Router();
let Company = require('../../models/masters/company.model');

router.route('/').get((req,res) => {
	Company.find()
		.then(company => res.json(company))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/add').post((req,res) => {

	const companyname   = req.body.companyname;
	const email         = req.body.email;
	const phone         = Number(req.body.phone);
	const address       = req.body.address;
	const pincode       = req.body.pincode;
	const country       = req.body.country;
	const state         = req.body.state;
	const city          = req.body.city;
	const logo          = req.body.logo;

	const newCompany = new Company({
		companyname,
		email,
		phone,
		address,
		pincode,
		country,
		state,
		city,
		logo,
	});

	newCompany.save()
		.then(() => res.json('Company Added'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/:id').get((req,res) => {
	Company.findById(req.params.id)
		.then(company => res.json(company))
		.catch(err => res.status(400).json('Error: ' +err));
});

router.route('/delete/:id').delete((req,res) => {
	Company.findByIdAndDelete(req.params.id)
		.then(() => res.json('Company Deleted'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/update/:id').post((req,res) => {
	Company.findById(req.params.id)
		.then(company => {
			
			company.companyname   = req.body.companyname;
			company.email         = req.body.email;
			company.phone         = Number(req.body.phone);
			company.address       = req.body.address;
			company.pincode       = req.body.pincode;
			company.country       = req.body.country;
			company.state         = req.body.state;
			company.city          = req.body.city;
			company.logo          = req.body.logo;

			company.save()
			 .then(() => res.json('Company Updated'))
			 .catch(err => res.status(400).json('Error: ' +err));
		}
		)
		.catch(err => res.status(400).json('Error: ' +err));
});


module.exports = router;