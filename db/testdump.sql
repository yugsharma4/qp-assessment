CREATE DATABASE IF NOT EXISTS grocery_booking;
USE grocery_booking;
create table Users (id int auto_increment primary key, name varchar(255) not null, mobile varchar(20) not null, password varchar(255) not null, role varchar(50) not null, createdDate datetime);
create table Items (id int auto_increment primary key, name varchar(255) not null, quantity int not null, price int not null, createdDate datetime, createdBy int, isActive boolean default true);
create table Inventory (id int auto_increment primary key, itemId int not null, available_quantity int, createdDate datetime, updatedDate datetime, constraint fk_itemId foreign key (itemId) references Items(id));
create table Orders (id int auto_increment primary key, userId int not null, orderDate datetime, amount int, constraint fk_userId foreign key (userId) references Users(id));
create table Order_Items(id int auto_increment primary key, orderId int not null, itemId int not null, quantity int not null, constraint fk_orderId foreign key (orderId) references Orders(id), constraint fk_order_itemId foreign key (itemId) references Items(id));

