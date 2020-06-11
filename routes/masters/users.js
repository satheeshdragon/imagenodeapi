const router = require('express').Router();
let Users = require('../../models/masters/user.model');

router.route('/').get((req,res) => {
	Users.find()
		.then(user => res.json(user))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/add').post((req,res) => {

	const username   = req.body.username;
	const password   = req.body.password;

	const newUsers = new Users({
		username,
		password,
	});

	newUsers.save()
		.then(() => res.json('Users Added'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/:id').get((req,res) => {
	Users.findById(req.params.id)
		.then(user => res.json(user))
		.catch(err => res.status(400).json('Error: ' +err));
});

router.route('/delete/:id').delete((req,res) => {
	Users.findByIdAndDelete(req.params.id)
		.then(() => res.json('Users Deleted'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/update/:id').post((req,res) => {
	Users.findById(req.params.id)
		.then(user => {
			user.username = req.body.username;
			user.password = req.body.password;

			user.save()
			 .then(() => res.json('Users Updated'))
			 .catch(err => res.status(400).json('Error: ' +err));
		}
		)
		.catch(err => res.status(400).json('Error: ' +err));
});


module.exports = router;