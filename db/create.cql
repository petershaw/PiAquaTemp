# http://www.datastax.com/documentation/tutorials/Time_Series.pdf
# http://www.datastax.com/dev/blog/metric-collection-and-storage-with-cassandra

CREATE KEYSPACE aquatemp 
	WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 } 
	AND durable_writes = false
;
GO

CREATE TABLE aquatemp.data_log ( 
	probe_name text, 
	date text, 
	event_time timestamp, 
	payload double, 
	PRIMARY KEY ((date, probe_name),event_time) 
)
;
GO

CREATE TABLE aquatemp.task_needsupdate ( 
	probe_name text, 
	date text, 
	updates counter, 
	PRIMARY KEY(date, probe_name) 
)
;
GO

CREATE TABLE aquatemp.by_minute (
	log_time timestamp,
	probe_name text,  
	payload map<text, double>,
	PRIMARY KEY (probe_name, log_time) 
)
;
GO

CREATE TABLE aquatemp.by_hours ( 
	log_time timestamp,
	probe_name text, 
	payload map<text, double>,
	PRIMARY KEY (probe_name, log_time) 
)
;
GO

CREATE TABLE aquatemp.by_days ( 
	log_time timestamp,
	probe_name text, 
	payload map<text, double>,
	PRIMARY KEY (probe_name, log_time) 
)
;
GO
