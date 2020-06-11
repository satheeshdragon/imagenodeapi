const router = require('express').Router();
let city = require('../../models/masters/city.model');

router.route('/').get((req,res) => {
	city.find()
		.then(city => res.json(city))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/add').post((req,res) => {

	const cityname   = req.body.cityname;
	const aliasname  = req.body.aliasname;

	const newcity = new city({
		cityname,
		aliasname,
	});

	newcity.save()
		.then(() => res.json('city Added'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/:id').get((req,res) => {
	city.findById(req.params.id)
		.then(city => res.json(city))
		.catch(err => res.status(400).json('Error: ' +err));
});

router.route('/delete/:id').delete((req,res) => {
	city.findByIdAndDelete(req.params.id)
		.then(() => res.json('city Deleted'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/update/:id').post((req,res) => {
	city.findById(req.params.id)
		.then(city => {
			city.cityname = req.body.cityname;
			city.aliasname    = req.body.aliasname;

			city.save()
			 .then(() => res.json('city Updated'))
			 .catch(err => res.status(400).json('Error: ' +err));
		}
		)
		.catch(err => res.status(400).json('Error: ' +err));
});


module.exports = router;