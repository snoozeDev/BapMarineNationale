<<<<<<< HEAD
-- phpMyAdmin SQL Dump
-- version 4.2.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 03, 2016 at 10:53 PM
-- Server version: 5.5.41-log
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `save_marine_nationale_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `save_marine_nationale_table`
--

CREATE TABLE IF NOT EXISTS `save_marine_nationale_table` (
`id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `save_polygones` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=9 ;

--
-- Dumping data for table `save_marine_nationale_table`
--

INSERT INTO `save_marine_nationale_table` (`id`, `name`, `description`, `author`, `save_polygones`) VALUES
(2, 'eamlkeamlkae', 'aze;mazemaz,m,azm,em,aeml,zmel,azmel,aeml,aeml,aeml,aeml,aemla,', 'Lucas Jhonson', ''),
(3, 'AAAAAAAAAAAAAAAAAA', 'azkejlaznelanz enakejh iajhzemlk h jn nkjlj nenl jnl jnalkne lknlkn lknlk nl knl knlk nlkn lkn lkn lknl knezlka nzelknaelkn azen lknlk nlknlakz leknlk nazknlkz nalknazelknelkanzlekanzleknlek nlka nlka', 'Jean Jeannot', ''),
(4, 'zouz', 'zouzeazezazeaze', '8888888', ''),
(5, 'zouz', 'zouzeazezazeaze', '8888888', ''),
(6, '7777777777', '77777777777', '111111111111', ''),
(7, '7777777777', '77777777777', '111111111111', ''),
(8, 'aaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaa', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `save_marine_nationale_table`
--
ALTER TABLE `save_marine_nationale_table`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `save_marine_nationale_table`
--
ALTER TABLE `save_marine_nationale_table`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
=======
-- phpMyAdmin SQL Dump
-- version 4.2.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 03, 2016 at 10:53 PM
-- Server version: 5.5.41-log
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `save_marine_nationale_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `save_marine_nationale_table`
--

CREATE TABLE IF NOT EXISTS `save_marine_nationale_table` (
`id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `save_polygones` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=9 ;

--
-- Dumping data for table `save_marine_nationale_table`
--

INSERT INTO `save_marine_nationale_table` (`id`, `name`, `description`, `author`, `save_polygones`) VALUES
(2, 'eamlkeamlkae', 'aze;mazemaz,m,azm,em,aeml,zmel,azmel,aeml,aeml,aeml,aeml,aemla,', 'Lucas Jhonson', ''),
(3, 'AAAAAAAAAAAAAAAAAA', 'azkejlaznelanz enakejh iajhzemlk h jn nkjlj nenl jnl jnalkne lknlkn lknlk nl knl knlk nlkn lkn lkn lknl knezlka nzelknaelkn azen lknlk nlknlakz leknlk nazknlkz nalknazelknelkanzlekanzleknlek nlka nlka', 'Jean Jeannot', ''),
(4, 'zouz', 'zouzeazezazeaze', '8888888', ''),
(5, 'zouz', 'zouzeazezazeaze', '8888888', ''),
(6, '7777777777', '77777777777', '111111111111', ''),
(7, '7777777777', '77777777777', '111111111111', ''),
(8, 'aaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaa', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `save_marine_nationale_table`
--
ALTER TABLE `save_marine_nationale_table`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `save_marine_nationale_table`
--
ALTER TABLE `save_marine_nationale_table`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
>>>>>>> 1abfc6fb8ff3ceb7c3f4bbb0314162f1b22ee8ed
