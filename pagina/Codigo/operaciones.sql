-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 14, 2012 at 09:55 PM
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
-- Table structure for table `operaciones`
--

CREATE TABLE IF NOT EXISTS `operaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `desc` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `desc` (`desc`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `operaciones`
--

INSERT INTO `operaciones` (`id`, `nombre`, `desc`) VALUES
(1, 'altaUsuario', 'Dar de alta un nuevo usuario en el sistema.'),
(2, 'altaEncuesta', 'Dar de alta una nueva encuesta.'),
(3, 'bajaEncuesta', 'Desabilitar una encuesta para que no se pueda votarla mas.'),
(4, 'resultadoEncuesta', 'Ve las encuestas para un programa en particular, tanto las habilitadas como desabilitadas.'),
(5, 'resultadoProgramas', 'Ve los resultados por programa, es decir cuales encuestas fueron las mas votadas.');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
