create database postgres;

create table users(
    id bigserial not null,
    fname varchar(64) not null,
    lname varchar(64) not null,
    phone int not null,
    email varchar(64) not null,
    primary key (id)
);

insert into users(fname, lname, phone, email) values('Zokir', 'Mahamadjonov', 974026466, 'zmaxamadjonov29@gmail.com' );
insert into users(fname, lname, phone, email) values('Bobur', 'Nizomov', 981620516, 'nbobur@gmail.com' );
insert into users(fname, lname, phone, email) values('Muhammad', 'Najimov', 998961000, 'najimovmuhammad@gmail.com' );
insert into users(fname, lname, phone, email) values('Nafisa', 'Umrova', 998642015, 'nafisa2015@gmail.com' );
