-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 09, 2023 at 11:16 PM
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
-- Table structure for table `dynamiclessons`
--

CREATE TABLE `dynamiclessons` (
  `id` int(11) NOT NULL,
  `lessons` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dynamiclessons`
--

INSERT INTO `dynamiclessons` (`id`, `lessons`, `date`, `class_id`) VALUES
(6, 'ИГМ, Информатика, _, _, _, _, _, _, _, _', '2023-03-09', 1),
(7, '_, ИГМ, История, _, _, _, _, _, _, _', '2023-06-16', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dynamiclessons`
--
ALTER TABLE `dynamiclessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dynamiclessons`
--
ALTER TABLE `dynamiclessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dynamiclessons`
--
ALTER TABLE `dynamiclessons`
  ADD CONSTRAINT `dynamiclessons_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
