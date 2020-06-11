const router = require('express').Router();

let stories  = require('../models/stories.model');
let zips     = require('../models/zips.model');


/* Get All data With Limts */

router.route('/').get((req,res) => {
	zips.find()
		.select('')
		.limit(5)
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* Count the Zips */

router.route('/count_zips').get((req,res) => {
	zips.count()
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* Count the Selecting Specific Data */

router.route('/select_zips').get((req,res) => {
	zips.find()
		.select('city')
		.limit(5)
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* Where Conditional */

router.route('/distinct_zips').get((req,res) => {
	zips.find()
		// .select('city')
		.limit(5)	
		// .where('city').in(['PISGAH', 'talking'])
		.distinct('city')
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* Where Conditional */

router.route('/where_zips').get((req,res) => {
	zips.find()
		.select('city')
		.limit(5)	
		.where('city').in(['PISGAH', 'talking'])
		.where('city').equals('PISGAH')
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* ------------------------------------------------------------------ */

/* Populate Conditional */

router.route('/populate_zips').get((req,res) => {
	zips.find()
		.populate('subscribing')
		.limit(5)
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* ------------------------------------------------------------------ */

/* Sorting */

router.route('/sort_zips').get((req,res) => {
	zips.find()
		.select('city')
		.limit(50)	
		.sort({city:-1})
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* End-Sorting */

/*

concatenation
adding

*/

router.get("/custom_zip", (req, res, next) => {
  zips.find()
    .select("city zip")
    .limit(5)
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        zips: docs.map(doc => {
          return {
            city: 'iam city data '+doc.city,
            zip: doc.zip,
            two_data :'CITY :'+doc.city+' Zip :'+doc.zip ,
            zip_add : parseInt(doc.zip) + parseInt(doc.zip) ,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:7000/zips/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/* ------------------------------------------------------------------ */

/* Aggregate */


router.route('/aggrega_zips').get((req,res) => {
	zips.aggregate([{$group : {_id : "$city", num_tutorial : {$sum : 1} }}])
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/aggrega_sum_zips').get((req,res) => {
	zips.aggregate([{$group : {_id : "$city", num_tutorial : {$sum : "$zip"}}}])
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

router.route('/aggrega_min_zips').get((req,res) => {
	zips.aggregate([{$group : {_id : "$city", num_tutorial : {$min : "$city"}}}])
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});


router.route('/aggrega_first_zips').get((req,res) => {
	zips.aggregate([{$group : {_id : "$city", first_data : {$first : "$city"}}}])
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* Joining Zips */

router.route('/aggrega_join_zips').get((req,res) => {
	zips.aggregate([
		{
        $lookup: {
            from: 'exercises',      // collection to join
            localField: 'city',          // field from categories collection
            foreignField: 'username', // field from subcategories collection
            as: 'subcategory'           
	        }
	    },
		])
		.limit(100)
		// .where('_id').equals('4ba267dc238d3ba3ca000015')
		.then(zips => res.json(zips))
		.catch(err => res.status(400).json('Error: ' +err));
});

/* ---------------- Join End ----------------- */

/* functional Query */

function getNextSequenceValue(sequenceName){
   var sequenceDocument = zips.findAndModify({
      query:{_id: sequenceName },
      update: {$inc:{sequence_value:1}},
      new:true
   });
   return sequenceDocument.sequence_value;
}



function hello(docid){
	
	return parseInt(docid) + 1;

}

router.get("/custom_functional_zip", (req, res, next) => {
  zips.find()
    .select("city zip")
    .limit(5)
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        zips: docs.map(doc => {
          return {
            city: 'iam city data '+doc.city,
            zip: doc.zip,
            two_data :'CITY :'+doc.city+' Zip :'+doc.zip+' Helo_func : '+hello( doc.zip ) ,
            zip_add : parseInt(doc.zip) + parseInt(doc.zip) ,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:7000/zips/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



module.exports = router;