var express = require('express');
var router = express.Router();
var dataprovider = require('../lib/dataprovider');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res) {
  dataprovider.getDataFromMinutes(30, function gotData(err, result){
  		var data = _.groupBy(result.rows, 'probe_name');
		var r = _.map( _.keys( data ), function(key){
			
			return( { label: key, data: _.map(data[key], function(elm){
				return [elm.log_time.getTime(), elm.payload.avg];
			}) } );
		});
	  	res.render('javascripts/chart.ejs', { 
 	  		  data: JSON.stringify(r)
	  		, element: '#flot-30m'
	  	});
  });
});

module.exports = router;
