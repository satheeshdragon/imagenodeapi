const router = require('express').Router();
let State = require('../../models/masters/state.model');

router.route('/').get((req,res) => {
	State.find()
		.then(state => res.json(state))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/add').post((req,res) => {

	const statename   = req.body.statename;
	const aliasname      = req.body.aliasname;

	const newState = new State({
		statename,
		aliasname,
	});

	newState.save()
		.then(() => res.json('State Added'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/:id').get((req,res) => {
	State.findById(req.params.id)
		.then(state => res.json(state))
		.catch(err => res.status(400).json('Error: ' +err));
});

router.route('/delete/:id').delete((req,res) => {
	State.findByIdAndDelete(req.params.id)
		.then(() => res.json('State Deleted'))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/update/:id').post((req,res) => {
	State.findById(req.params.id)
		.then(state => {
			state.statename = req.body.statename;
			state.aliasname    = req.body.aliasname;

			state.save()
			 .then(() => res.json('State Updated'))
			 .catch(err => res.status(400).json('Error: ' +err));
		}
		)
		.catch(err => res.status(400).json('Error: ' +err));
});


module.exports = router;