const router = require('express').Router();
let Country = require('../../models/masters/country.model');

router.route('/').get((req,res) => {
	Country.find()
		.then(country => res.json(country))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/add').post((req,res) => {

	const countryname   = req.body.countryname;
	const aliasname      = req.body.aliasname;

	const newCountry = new Country({
		countryname,
		aliasname,
	});

	newCountry.save()
		.then(() => res.json('Country Added'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/:id').get((req,res) => {
	Country.findById(req.params.id)
		.then(country => res.json(country))
		.catch(err => res.status(400).json('Error: ' +err));
});

router.route('/delete/:id').delete((req,res) => {
	Country.findByIdAndDelete(req.params.id)
		.then(() => res.json('Country Deleted'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/update/:id').post((req,res) => {
	Country.findById(req.params.id)
		.then(country => {
			country.countryname = req.body.countryname;
			country.aliasname    = req.body.aliasname;

			country.save()
			 .then(() => res.json('Country Updated'))
			 .catch(err => res.status(400).json('Error: ' +err));
		}
		)
		.catch(err => res.status(400).json('Error: ' +err));
});


module.exports = router;