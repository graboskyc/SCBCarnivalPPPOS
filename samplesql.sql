create table IF NOT EXISTS recpt(
	id int(11) NOT NULL AUTO_INCREMENT,
	recid int(11),
	register varchar(32),
	encText text,
	PRIMARY KEY (id)
);

alter table 
	recpt 
	add column created timestamp not null default CURRENT_TIMESTAMP after encText;