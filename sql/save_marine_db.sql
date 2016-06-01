-- phpMyAdmin SQL Dump
-- version 4.2.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 31, 2016 at 03:45 PM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
