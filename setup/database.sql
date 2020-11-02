create database network;
create extension pgcrypto;

create table clients (
	id serial not null,
	username varchar(32) not null,
	password varchar(60) not null,
	first_name varchar(32) not null,
	last_name varchar(32) not null,
	deleted_at timestamptz,
	created_at timestamptz default current_timestamp,
	primary key(id)
);

create unique index on clients (lower(username));

insert into clients (
	username,
	password,
	first_name,
	last_name
) values
('sobir',
	crypt( 'salom', gen_salt('bf')),
	'Sobir',
	'Nazarov'),
	('salim',
	crypt( 'salom', gen_salt('bf')),
	'Salim',
	'Murodov')
;
