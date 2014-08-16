var express = require('express');
var router = express.Router();
var dataprovider = require('../lib/dataprovider');
var _ = require('underscore');

/* GET home page. */
router.get('/:period/:time', function(req, res, next) {
	console.log("# ", req.params.period, req.params.time );
	if(req.params.period == "minutes"){
	  dataprovider.getDataFromMinutes(parseInt(req.params.time), function gotData(err, result){
			var data = _.groupBy(result.rows, 'probe_name');
			var r = _.map( _.keys( data ), function(key){
			
				return( { label: key, data: _.map(data[key], function(elm){
					return [elm.log_time.getTime(), elm.payload.avg];
				}) } );
			});
			res.render('javascripts/chart.ejs', { 
				  data: JSON.stringify(r)
				, element: '#flot-'+ req.params.time +'m'
				, type: req.params.period
				, period: req.params.time 
			});
 			return;
	  });
	}
	if(req.params.period == "hours"){
	  dataprovider.getDataFromHours(parseInt(req.params.time), function gotData(err, result){
	  console.log(err, result);
			var data = _.groupBy(result.rows, 'probe_name');
			var r = _.map( _.keys( data ), function(key){
			
				return( { label: key, data: _.map(data[key], function(elm){
					return [elm.log_time.getTime(), elm.payload.avg];
				}) } );
			});
			console.log(r);
 			res.render('javascripts/chart.ejs', { 
				  data: JSON.stringify(r)
 				, element: '#flot-'+ req.params.time +'h'
				, type: req.params.period
				, period: req.params.time 
 			});
	  });
	}
});

module.exports = router;
