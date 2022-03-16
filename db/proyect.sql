-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 16-03-2022 a las 17:28:05
-- Versión del servidor: 8.0.28-0ubuntu0.20.04.3
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyect`
--
CREATE DATABASE IF NOT EXISTS `proyect` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `proyect`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `ID` int NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Cedula` int NOT NULL,
  `Edad` int NOT NULL,
  `Telefono` varchar(1234) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`ID`, `Nombre`, `Apellido`, `Email`, `Password`, `Cedula`, `Edad`, `Telefono`, `CreatedDate`, `updatedAt`) VALUES
(1, 'Alexander', 'Avendaño', 'avendano.ramirez@gmail.com', '$2a$10$GgW095/LuVXOsPoRPEw1FeNvTshpfORXjHabVpyiCKGzC9bSVHgz2', 29694896, 19, '04265121891', '2022-03-16 01:57:41', '2022-03-16 01:57:41'),
(2, 'Angel', 'Arraiz', 'arraizangel@gmail.com', '$2a$10$s6YtQjMQ3PZkAmr8zqlA6evvc.xNjuLStjQx/9CXIVzcBtS2zFvHy', 30654897, 18, '04265487521', '2022-03-16 19:55:57', '2022-03-16 19:55:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `ID` int NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Cedula` int NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Contenido` varchar(255) NOT NULL,
  `Contador` int NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`ID`, `Nombre`, `Apellido`, `Cedula`, `Titulo`, `Contenido`, `Contador`, `CreatedDate`, `updatedAt`) VALUES
(1, 'Jose', 'Ramirez', 29694898, 'Titulo', 'Nuevo Contenido', 0, '2022-03-16 02:42:37', '2022-03-16 03:24:22'),
(2, 'Alexander', 'Ramirez', 29694896, 'Titulo de prueba', 'Mas contenido', 0, '2022-03-16 19:36:00', '2022-03-16 20:13:30'),
(3, 'Luis', 'Paredes', 30964582, 'Titulo de publicacion', 'Otro contenido', 0, '2022-03-16 19:41:30', '2022-03-16 19:41:30'),
(4, 'Angel', 'Arraiz', 30645123, 'Otro Titulo', 'Espacio para nuevo contenido', 0, '2022-03-16 19:48:20', '2022-03-16 19:48:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID` int NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Cedula` int NOT NULL,
  `Edad` int NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID`, `Nombre`, `Apellido`, `Email`, `Password`, `Cedula`, `Edad`, `CreatedDate`, `updatedAt`) VALUES
(1, 'Jose', 'Ramirez', 'avendanoramireza@uvm.edu.ve', '$2a$10$knj23zbDuMRagcrj2WoQbuskiQfDEuZjOvy0H7qnop4clh7T8qXEe', 29694898, 20, '2022-03-16 01:58:18', '2022-03-16 03:26:35'),
(2, 'Alexander', 'Avendaño', 'avendano.ramirez@gmail.com', '$2a$10$TxdpVDgeEJ3z1IBYCvYSh.Qum2gG/gIkaiBQPpQiS/SbhdqHYd44m', 29694896, 19, '2022-03-16 19:52:41', '2022-03-16 19:52:41'),
(3, 'Luis', 'Paredes', 'luisparedes29@gmail.com', '$2a$10$g/dLAscx3jhnM1fd5DlVOeyQrU1MxynHi08K.TP7/7n79/W9pwfJe', 28965412, 21, '2022-03-16 19:54:16', '2022-03-16 19:54:16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `admins__cedula` (`Cedula`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `publicaciones__cedula` (`Cedula`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `users__cedula` (`Cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
