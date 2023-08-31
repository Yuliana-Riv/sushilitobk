CREATE DATABASE sushilito_db_32fhd;

use sushilito_db_32fhd;

CREATE TABLE users(
id  int(11) auto_increment not null,
name varchar(100) not null,
lastname varchar(100) not null,
email varchar(150) not null,
pass varchar(300) not null,
phone varchar (30),
role varchar(50) not null DEFAULT 'user',
image varchar(255),
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_user PRIMARY KEY(id)
)ENGINE=InnoDb;

INSERT INTO users  (name, lastname, email, pass, phone, role, image) VALUES ('Erik', 'Gonzalez', 'erik@legrafica.mx', '$2b$10$JaIYejy6vdcRaP233dDNTuHdbpE/GOS0ywufXCyA0sCu3.sloBsN2', '6221270622', 'legrafica', 'sin imagen');

CREATE TABLE session (
id  int(11) auto_increment not null,
id_user int not null,
type varchar(30) not null,
code varchar(30) not null,
exp DATE,
created_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_session PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE profile(
id  int(11) auto_increment not null,
name varchar(150) not null,
code varchar(50) not null,
main varchar(50) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_profile PRIMARY KEY(id)
)ENGINE=InnoDb; 


INSERT INTO profile(name, code, main) VALUES('Color Resalte','#E21F1D','si');
INSERT INTO profile(name, code, main) VALUES('Color Principal','#242424','si');
INSERT INTO profile(name, code, main) VALUES('Links','#A7A7A7','si');
INSERT INTO profile(name, code, main) VALUES('Title','#8D8D8D','si');
INSERT INTO profile(name, code, main) VALUES('Body Text','#ffffff','si');
INSERT INTO profile(name, code, main) VALUES('Sidebar Text/Lines','#E5E5E5','si');
INSERT INTO profile(name, code, main) VALUES('Blanco','#ffffff','si');

CREATE TABLE personalize(
id  int(11) auto_increment not null,
logo varchar(150),
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_personalize PRIMARY KEY(id)
)ENGINE=InnoDb; 
INSERT INTO personalize(logo) VALUES('logo.png');
 








CREATE TABLE suscripciones(
id  int(11) auto_increment not null,
email varchar(250) not null,
sub_date DATE,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_suscripciones PRIMARY KEY(id)
)ENGINE=InnoDb;



CREATE TABLE banner(
id int(11) auto_increment not null,
type varchar(10) not null, 
image varchar(255) not null,
image_mv varchar(255) not null,
link varchar(1000) not null,
created_at timestamp DEFAULT current_timestamp,
update_at timestamp DEFAULT current_timestamp,
CONSTRAINT pk_banner PRIMARY KEY(id)
)ENGINE=InnoDb; 


/*GENERAL INFO**/
CREATE TABLE address(
id int(11) auto_increment not null, 
address varchar(255) not null,
colonia varchar(255) not null,
zip varchar(255) not null,
city varchar(255) not null, 
state varchar(255) not null, 
country  varchar(255) not null, 
created_at timestamp DEFAULT current_timestamp,
updated_at timestamp DEFAULT current_timestamp,
CONSTRAINT pk_address PRIMARY KEY(id)
)ENGINE=InnoDb; 

CREATE TABLE phone(
id int(11) auto_increment not null, 
phone varchar(255) not null, 
type varchar(30) not null, 
created_at timestamp DEFAULT current_timestamp,
updated_at timestamp DEFAULT current_timestamp,
CONSTRAINT pk_phone PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE horario(
id int(11) auto_increment not null, 
start_day varchar(255) not null, 
end_day varchar(255) not null, 
start_hour varchar(255) not null, 
end_hour varchar(255) not null, 
created_at timestamp DEFAULT current_timestamp,
updated_at timestamp DEFAULT current_timestamp,
CONSTRAINT pk_horario PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE social_media(
id int(11) auto_increment not null, 
social_media varchar(255) not null, 
link varchar(255) not null, 
created_at timestamp DEFAULT current_timestamp,
updated_at timestamp DEFAULT current_timestamp,
CONSTRAINT pk_social_media PRIMARY KEY(id)
)ENGINE=InnoDb;


/* Esto lo hizo el Eduardo c:*/
CREATE TABLE sucursales(
id int(11) auto_increment not null,
tipo varchar(100) not null,
nombre varchar(100) not null, 
image varchar(255) not null,
direccion varchar(1000) not null,
mapa MEDIUMTEXT not null,
created_at timestamp DEFAULT current_timestamp,
updated_at timestamp DEFAULT current_timestamp,
CONSTRAINT pk_sucursales PRIMARY KEY(id)
)ENGINE=InnoDb; 

CREATE TABLE tel_sucursales(
id int(11) auto_increment not null,
id_sucursal int(11) not null,
numero varchar(16) not null,
created_at timestamp DEFAULT current_timestamp,
updated_at timestamp DEFAULT current_timestamp,
CONSTRAINT pk_tel_sucursales PRIMARY KEY(id),
CONSTRAINT fk_numero FOREIGN KEY(id_sucursal) REFERENCES sucursales(id)
)ENGINE=InnoDb; 

 