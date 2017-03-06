-- phpMyAdmin SQL Dump
-- version 4.6.4deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 06, 2017 at 12:52 PM
-- Server version: 5.7.17-0ubuntu0.16.10.1
-- PHP Version: 7.0.15-0ubuntu0.16.10.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tennis`
--

-- --------------------------------------------------------

--
-- Table structure for table `campi_da_gioco`
--

CREATE TABLE `campi_da_gioco` (
  `id` int(11) NOT NULL,
  `nome` varchar(32) DEFAULT NULL,
  `id_tipo` int(11) DEFAULT NULL,
  `coperto` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `campi_da_gioco`
--

INSERT INTO `campi_da_gioco` (`id`, `nome`, `id_tipo`, `coperto`) VALUES
(1, 'A', 1, 0),
(2, 'B', 3, 1),
(3, 'C', 3, 1),
(7, 'D', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `id` int(11) NOT NULL,
  `id_campo` int(11) DEFAULT NULL,
  `id_socio` int(11) DEFAULT NULL,
  `giorno_ora` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prenotazioni`
--

INSERT INTO `prenotazioni` (`id`, `id_campo`, `id_socio`, `giorno_ora`) VALUES
(4, 1, 2, '2017-03-06 12:00:24'),
(5, 7, 4, '2017-03-14 15:00:55');

-- --------------------------------------------------------

--
-- Table structure for table `soci`
--

CREATE TABLE `soci` (
  `id` int(11) NOT NULL,
  `nome` varchar(32) DEFAULT NULL,
  `cognome` varchar(32) DEFAULT NULL,
  `id_tessera` int(11) DEFAULT NULL,
  `telefono` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soci`
--

INSERT INTO `soci` (`id`, `nome`, `cognome`, `id_tessera`, `telefono`) VALUES
(1, 'iulio', 'barbone', 2, '000111222'),
(2, 'gino', 'parcino', 1, '44455566'),
(4, 'ralpano', 'catamarano', 3, '66350'),
(7, 'test', 'testosterone', NULL, '123');

-- --------------------------------------------------------

--
-- Table structure for table `terreno`
--

CREATE TABLE `terreno` (
  `id` int(11) NOT NULL,
  `descr` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `terreno`
--

INSERT INTO `terreno` (`id`, `descr`) VALUES
(1, 'Cement'),
(2, 'Grass'),
(3, 'Dirt'),
(4, 'Rubber');

-- --------------------------------------------------------

--
-- Table structure for table `tesseramenti`
--

CREATE TABLE `tesseramenti` (
  `id` int(11) NOT NULL,
  `anno` int(11) DEFAULT NULL,
  `costo` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tesseramenti`
--

INSERT INTO `tesseramenti` (`id`, `anno`, `costo`) VALUES
(1, 2017, 10),
(2, 2015, 5.5),
(3, 2016, 9),
(5, 2017, 9.5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campi_da_gioco`
--
ALTER TABLE `campi_da_gioco`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `soci`
--
ALTER TABLE `soci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terreno`
--
ALTER TABLE `terreno`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tesseramenti`
--
ALTER TABLE `tesseramenti`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campi_da_gioco`
--
ALTER TABLE `campi_da_gioco`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `prenotazioni`
--
ALTER TABLE `prenotazioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `soci`
--
ALTER TABLE `soci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `terreno`
--
ALTER TABLE `terreno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tesseramenti`
--
ALTER TABLE `tesseramenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
