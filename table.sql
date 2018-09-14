DROP TABLE IF EXISTS RegistrationNumbers, towns;

create table towns(
    id serial not null primary key,
    town_name varchar(50) not null,
    town_id varchar(20) not null
     );


create table RegistrationNumbers(
  id serial primary key not null,
 reg text not null,
 town_id int not null,
 foreign key(town_id) references towns(id) ON DELETE CASCADE
    );



insert into towns (town_name, town_id) values ('Cape Town', 'CA');
insert into towns (town_name,town_id) values ('George', 'CAW');
insert into towns (town_name,town_id) values ('Paarl', 'CJ');
