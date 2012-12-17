-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 14, 2012 at 09:56 PM
-- Server version: 5.5.25a
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jemac_tesis`
--

-- --------------------------------------------------------

--
-- Table structure for table `operaciones_x_categoria`
--

CREATE TABLE IF NOT EXISTS `operaciones_x_categoria` (
  `id_c` int(11) NOT NULL,
  `id_op` int(11) NOT NULL,
  PRIMARY KEY (`id_c`,`id_op`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operaciones_x_categoria`
--

INSERT INTO `operaciones_x_categoria` (`id_c`, `id_op`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 2),
(2, 3),
(2, 4),
(2, 5);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
