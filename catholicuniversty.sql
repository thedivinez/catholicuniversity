-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2024 at 07:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `catholicuniversty`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessment`
--

CREATE TABLE `assessment` (
  `id` varchar(100) NOT NULL,
  `regNumber` varchar(20) NOT NULL,
  `week` varchar(20) NOT NULL,
  `date` varchar(40) NOT NULL,
  `task` text NOT NULL,
  `comments` text NOT NULL,
  `supervisor` varchar(40) NOT NULL,
  `supervisorComment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessment`
--

INSERT INTO `assessment` (`id`, `regNumber`, `week`, `date`, `task`, `comments`, `supervisor`, `supervisorComment`) VALUES
('e739d5c6-88ef-4b01-b213-0b4d1b9fae1d', 'CU3235', 'Week 1', '04/03/2024', 'Created the best trading platform in the world', 'I learnt how to use Typescript', 'Tadiwa Machipisa', ''),
('f76bda72-c045-4483-87f3-92686e4860ad', 'CU3235', 'Week 2', '04/03/2024', 'Learnt how to connect to a Virtual private server using ssh', 'This was a fun task since I had never used real servers before', 'Tadiwa Machipisa', '');

-- --------------------------------------------------------

--
-- Table structure for table `existingdb`
--

CREATE TABLE `existingdb` (
  `regNumber` varchar(20) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `programme` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `existingdb`
--

INSERT INTO `existingdb` (`regNumber`, `firstName`, `lastName`, `phone`, `email`, `programme`) VALUES
('CU3235', 'John', 'Claison', '+263 786 854 223', 'dzbusiness01@gmail.com', 'Bachelor of Software Engineering Honours'),
('SUP001', 'Takudzwa', 'Matambo', '+263 787 909 786', 'tmatambo@gmail.com', 'Faculty Of Science and Technology');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` varchar(200) NOT NULL,
  `supervisor` varchar(20) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `supervisor`, `message`) VALUES
('eb35c2e4-9121-4aa5-bfd7-b591825d5de6', 'SUP001', 'Attention to all, you are required to start updating your logbook as soon as possible');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` text NOT NULL,
  `regNumber` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `userType` text NOT NULL,
  `organization` text NOT NULL,
  `supervisor` text NOT NULL,
  `startingDate` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `regNumber`, `password`, `userType`, `organization`, `supervisor`, `startingDate`) VALUES
('01a69984-fbfe-4b0b-99f0-cf7558b92de7', 'CU3235', '1234', 'student', 'Direct Digital World', 'SUP001', '03/31/2024'),
('01a69984-fbfe-4b0b-99f0-cf7558b92de7', 'SUP001', '1234', 'supervisor', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`regNumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
