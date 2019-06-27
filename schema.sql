CREATE DATABASE driver;
USE driver;

CREATE TABLE `driver` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `vehicleYMM` VARCHAR( 255) NOT NULL,
  `startingLocation`BOOLEAN DEFAULT 0,
  `destnation`BOOLEAN DEFAULT 0,
  `departureTime` DATETIME NOT NULL,
  `openSeats` varchar(255) NOT NULL,

  PRIMARY KEY ( `id` ) 
);

CREATE TABLE `riders` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `numberOfRiders` VARCHAR( 255) NOT NULL,
  `startingLocation` BOOLEAN DEFAULT 0,
  `destnation` BOOLEAN DEFAULT 0,

  PRIMARY KEY ( `id` ) 
);