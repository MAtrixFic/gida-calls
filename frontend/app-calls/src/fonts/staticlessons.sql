-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 09, 2023 at 11:15 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_bell`
--

-- --------------------------------------------------------

--
-- Table structure for table `staticlessons`
--

CREATE TABLE `staticlessons` (
  `id` int(11) NOT NULL,
  `lessons` varchar(200) NOT NULL,
  `weekDay` varchar(20) DEFAULT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `staticlessons`
--

INSERT INTO `staticlessons` (`id`, `lessons`, `weekDay`, `class_id`) VALUES
(22, 'Математика, Литература, Родной язык, _, _, _, _, _, _, _', 'вторник', 1),
(23, 'Информатика, География, Английский язык, Английский язык, _, _, _, _, _, _', 'понедельник', 1),
(24, 'Русский язык, Физическая культура, Физическая культура, Математика, _, _, _, _, _, _', 'среда', 1),
(25, 'География, Английский язык, Литература, Литература, _, _, _, _, _, _', 'пятница', 1),
(26, 'География, Информатика, Математика, _, _, _, _, _, _, _', 'суббота', 1),
(27, 'География, Информатика, Домой, _, _, _, _, _, _, _', 'четверг', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `staticlessons`
--
ALTER TABLE `staticlessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `staticlessons`
--
ALTER TABLE `staticlessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `staticlessons`
--
ALTER TABLE `staticlessons`
  ADD CONSTRAINT `staticlessons_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
