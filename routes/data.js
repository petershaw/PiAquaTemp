var express = require('express');
var router = express.Router();
var dataprovider = require('../lib/dataprovider');
var _ = require('underscore');

/* GET home page. */
router.get('/minutes/:min', function(req, res) {
  dataprovider.getDataFromMinutes(req.params.min, function gotData(err, result){
  		var data = _.groupBy(result.rows, 'probe_name');
		var r = _.map( _.keys( data ), function(key){
			
			return( { label: key, data: _.map(data[key], function(elm){
				return [elm.log_time.getTime(), elm.payload.avg];
			}) } );
		});
	  	res.send( JSON.stringify(r) );
  });
});

router.get('/hours/:hours', function(req, res) {
  dataprovider.getDataFromHours(req.params.hours, function gotData(err, result){
  		var data = _.groupBy(result.rows, 'probe_name');
		var r = _.map( _.keys( data ), function(key){
			
			return( { label: key, data: _.map(data[key], function(elm){
				return [elm.log_time.getTime(), elm.payload.avg];
			}) } );
		});
	  	res.send( JSON.stringify(r) );
  });
});

module.exports = router;
