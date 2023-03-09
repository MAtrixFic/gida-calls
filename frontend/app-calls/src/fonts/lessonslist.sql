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
-- Table structure for table `lessonslist`
--

CREATE TABLE `lessonslist` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lessonslist`
--

INSERT INTO `lessonslist` (`id`, `name`) VALUES
(1, 'Математика'),
(2, 'Русский язык'),
(3, 'Информатика'),
(4, 'Физическая культура'),
(5, 'География'),
(6, 'Литература'),
(7, 'История'),
(8, 'ОБЖ'),
(9, 'Физика'),
(10, 'Химия'),
(11, 'Музыка'),
(12, 'Английский язык'),
(13, 'ИГМ'),
(14, 'Родной язык'),
(15, 'Проектная деятельность'),
(16, 'Нет урока'),
(17, 'Домой');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lessonslist`
--
ALTER TABLE `lessonslist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lessonslist`
--
ALTER TABLE `lessonslist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
