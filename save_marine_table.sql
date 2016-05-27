-- phpMyAdmin SQL Dump
-- version 4.2.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 27, 2016 at 11:20 AM
-- Server version: 5.5.41-log
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `save_marine`
--

-- --------------------------------------------------------

--
-- Table structure for table `save_marine_table`
--

CREATE TABLE IF NOT EXISTS `save_marine_table` (
`id` int(11) NOT NULL,
  `mapName` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mapDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cercles` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `polygs` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `texts` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `polyls` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `batis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `bateaux` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `save_marine_table`
--

INSERT INTO `save_marine_table` (`id`, `mapName`, `mapDescription`, `cercles`, `polygs`, `texts`, `polyls`, `batis`, `bateaux`) VALUES
(1, 'test', 'test', '', '', '', '', '', '{"0":[{"icon":{"options":{"className":"","iconUrl":"image/porte-avion-allie.png","iconSize":[30,30],"iconAnchor":[15,15],"popupAnchor":[0,-9]},"_initHooksCalled":true}},"15","blue",false,1,"porte-avion",1,80000,false,[{"lat":-5.178482088522876,"lng":-15.5126953125},{"lat":-3.0308121226643703,"lng":-9.7119140625},{"lat":0.7909904981540058,"lng":-11.953125},{"lat":6.0094592380595495,"lng":-8.4814453125}]],"1":[{"icon":{"options":{"className":"","iconUrl":"image/porte-avion-allie.png","iconSize":[30,30],"iconAnchor":[15,15],"popupAnchor":[0,-9]},"_initHooksCalled":true}},"15","blue",false,1,"porte-avion",1,80000,false,[{"lat":2.152813583128846,"lng":-15.6884765625}]],"3":[{"icon":{"options":{"className":"","iconUrl":"image/porte-avion-allie.png","iconSize":[30,30],"iconAnchor":[15,15],"popupAnchor":[0,-9]},"_initHooksCalled":true}},"15","blue",false,1,"porte-avion",1,80000,false,[{"lat":-2.1967272417616583,"lng":-25.6640625},{"lat":3.337953961416485,"lng":-25.0048828125},{"lat":5.04717073691972,"lng":-17.75390625},{"lat":1.1425024037061522,"lng":-9.140625}]],"4":[{"icon":{"options":{"className":"","iconUrl":"image/porte-avion-allie.png","iconSize":[30,30],"iconAnchor":[15,15],"popupAnchor":[0,-9]},"_initHooksCalled":true}},"15","blue",false,1,"porte-avion",1,80000,false,[{"lat":-1.7575368113083125,"lng":-18.3251953125}]],"5":[{"icon":{"options":{"className":"rred2","iconUrl":"image/bpc-neutre.png","iconSize":[30,30],"iconAnchor":[15,15],"popupAnchor":[0,-9]},"_initHooksCalled":true}},"15","green",false,1,"bpc",1,80000,false,[{"lat":-3.381823735328289,"lng":0.263671875},{"lat":-2.3284603685731593,"lng":-3.251953125}]],"6":[{"icon":{"options":{"className":"rred2","iconUrl":"image/tigre-ennemi.png","iconSize":[30,30],"iconAnchor":[15,15],"popupAnchor":[0,-9]},"_initHooksCalled":true}},"15","red",false,1,"tigre",1,80000,false,[{"lat":-1.845383988573187,"lng":-15.073242187499998}]]}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `save_marine_table`
--
ALTER TABLE `save_marine_table`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `save_marine_table`
--
ALTER TABLE `save_marine_table`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
