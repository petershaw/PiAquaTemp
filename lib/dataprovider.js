'use strict';

var cql 		= require('node-cassandra-cql')
	, moment	= require('moment')
	;

var client = new cql.Client({hosts: ['localhost'], keyspace: 'aquatemp'});

module.exports = {
	getDataFromHours: function getDataFromHours(hours, callback){
		var from = new Date(moment().subtract(hours, 'hours')).getTime();
		client.execute(
			"SELECT log_time, probe_name, payload FROM aquatemp.by_hours WHERE log_time >= ? ALLOW FILTERING"
			, [from]
			, cql.types.consistencies.one
			, function(err, result) {
				callback(err, result);
			}
		);
	}
	
	, getDataFromMinutes: function getDataFromMinutes(minutes, callback){
		var from = new Date(moment().subtract(minutes, 'minutes')).getTime();
		client.execute(
			"SELECT log_time, probe_name, payload FROM aquatemp.by_minute WHERE log_time >= ? ALLOW FILTERING"
			, [from]
			, cql.types.consistencies.one
			, function(err, result) {
				result.rows.pop();
				callback(err, result);
			}
		);
	}
}
