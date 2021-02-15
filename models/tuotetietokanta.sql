-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09.01.2021 klo 21:09
-- Palvelimen versio: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tuotetietokanta`
--

-- --------------------------------------------------------

--
-- Rakenne taululle `kayttajat`
--

CREATE TABLE `kayttajat` (
  `id` int(11) NOT NULL,
  `kayttajatunnus` text COLLATE utf8_swedish_ci NOT NULL,
  `salasana` text COLLATE utf8_swedish_ci NOT NULL,
  `kayttooikeus` text COLLATE utf8_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Vedos taulusta `kayttajat`
--

INSERT INTO `kayttajat` (`id`, `kayttajatunnus`, `salasana`, `kayttooikeus`) VALUES


-- --------------------------------------------------------

--
-- Rakenne taululle `suosikit`
--

CREATE TABLE `suosikit` (
  `id` int(11) NOT NULL,
  `kayttajaId` int(11) NOT NULL,
  `tuoteId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Vedos taulusta `suosikit`
--

INSERT INTO `suosikit` (`id`, `kayttajaId`, `tuoteId`) VALUES


-- --------------------------------------------------------

--
-- Rakenne taululle `tuotteet`
--

CREATE TABLE `tuotteet` (
  `id` int(11) NOT NULL,
  `nimi` text COLLATE utf8_swedish_ci NOT NULL,
  `hinta` float(10,2) NOT NULL,
  `kuvaus` text COLLATE utf8_swedish_ci NOT NULL,
  `varastosaldo` int(11) NOT NULL,
  `tuotekuva` text COLLATE utf8_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Vedos taulusta `tuotteet`
--

INSERT INTO `tuotteet` (`id`, `nimi`, `hinta`, `kuvaus`, `varastosaldo`, `tuotekuva`) VALUES

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kayttajat`
--
ALTER TABLE `kayttajat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suosikit`
--
ALTER TABLE `suosikit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tuotteet`
--
ALTER TABLE `tuotteet`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kayttajat`
--
ALTER TABLE `kayttajat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `suosikit`
--
ALTER TABLE `suosikit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tuotteet`
--
ALTER TABLE `tuotteet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
