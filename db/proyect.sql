-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 04-04-2022 a las 16:43:57
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
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Cedula` int(11) NOT NULL,
  `Edad` int(2) NOT NULL,
  `Telefono` varchar(1234) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`ID`, `Nombre`, `Apellido`, `Email`, `Password`, `Cedula`, `Edad`, `Telefono`, `CreatedDate`, `updatedAt`) VALUES
(1, 'Alexander', 'Avendaño', 'avendano.ramirez@gmail.com', '$2a$10$mAPNBQxuICN8XqBTrz/LSOX/natsivujYIFVkepb9eIel/Gv9oNku', 29694896, 19, '04265121891', '2022-03-31 16:04:59', '2022-03-31 16:04:59'),
(2, 'Jose', 'Ramirez', 'avendano.ramirez@gmail.com', '$2a$10$gSNxktBAtHmkQreEghDxted3H9WRQH6Yx.tgjEpbIxtBlGvmYYeiy', 29694895, 20, '04265121891', '2022-04-03 21:58:17', '2022-04-03 21:58:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Cedula` int(11) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Contenido` varchar(255) NOT NULL,
  `Media` varchar(255) NOT NULL,
  `Contador` int(11) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`ID`, `Nombre`, `Apellido`, `Cedula`, `Titulo`, `Contenido`, `Media`, `Contador`, `CreatedDate`, `updatedAt`) VALUES
(4, 'Alexander', 'Ramirez', 29694896, 'Titulo de Prueba', 'Nuevo contenido', '29403-1920x1080.jpg', 12, '2022-04-02 02:46:03', '2022-04-04 17:51:50'),
(5, 'Jose', 'Ramirez', 29694899, 'Un titulo mas', 'Nuevo contenido Nuevo contenidoNuevo contenidoNuevo contenidoNuevo contenidoNuevo contenido', 'triangle_inverted_black_white_92770_1920x1200.jpg', 19, '2022-04-02 15:56:29', '2022-04-04 19:16:23'),
(6, 'Alexander', 'Ramirez', 266265, 'Titulo Modificado Otra Vez', 'Nuevo Contenido Modificado Otra vez', '29403-1920x1080.jpg', 17, '2022-04-03 15:50:50', '2022-04-04 19:12:13'),
(7, 'Douglas', 'Ramirez', 25646545, 'Increible Galaxia', 'Nuevo contenido para realizar pruebas ', 'space_sky_stars_79233_1920x1200.jpg', 1, '2022-04-04 04:30:55', '2022-04-04 04:32:34'),
(9, 'Juan', 'Perez', 2564654, 'Increible Galaxia', 'Nuevo contenido para realizar pruebas ', '29384-1920x1080.jpg', 0, '2022-04-04 04:32:10', '2022-04-04 04:32:10'),
(10, 'Jose', 'Rodriguez', 6234581, 'Excelente titulo aqui', 'Nuevo contenido para realizar pruebas ', 'abstraction_sharp_figure_101902_1920x1200.jpg', 0, '2022-04-04 04:33:17', '2022-04-04 04:33:17'),
(11, 'Alexander', 'Avendaño', 84845145, 'Excelente titulo aqui', 'Nuevo contenido para realizar pruebas ', 'triangle_inverted_black_white_92770_1920x1200.jpg', 0, '2022-04-04 04:33:51', '2022-04-04 04:33:51'),
(12, 'Alexander', 'Ramirez', 1445784, 'Otro Excelente titulo aqui', 'Nuevo contenido para realizar pruebas ', 'triangle_inverted_black_white_92770_1920x1200.jpg', 0, '2022-04-04 04:34:09', '2022-04-04 04:34:09'),
(13, 'Freddy', 'Ramirez', 15646556, 'Otro Excelente titulo aqui', 'Nuevo contenido para realizar pruebas ', 'triangle_inverted_black_white_92770_1920x1200.jpg', 0, '2022-04-04 04:34:31', '2022-04-04 04:34:31'),
(15, 'Angel', 'Arraiz', 5468956, 'Otro Excelente titulo aqui', 'Nuevo contenido para realizar pruebas ', 'triangle_inverted_black_white_92770_1920x1200.jpg', 0, '2022-04-04 04:34:50', '2022-04-04 04:34:50'),
(16, 'Sara', 'gonzales', 789956431, 'Otro Excelente titulo aqui', 'Nuevo contenido para realizar pruebas ', 'triangle_inverted_black_white_92770_1920x1200.jpg', 6, '2022-04-04 04:35:16', '2022-04-04 17:54:27'),
(17, 'Alexander', 'avendao', 1516515, 'Un titulo ahi', 'ajksdjnajkndaknsjkankjsnajknj kjasndjandjnasjkn', 'abstraction_shapes_dark_background_115105_1920x1200.jpg', 0, '2022-04-04 17:58:20', '2022-04-04 17:58:20'),
(19, 'Alexander', 'avendao', 516515, 'Un titulo ahi', 'ajksdjnajkndaknsjkankjsnajknj kjasndjandjnasjkn', 'abstraction_shapes_dark_background_115105_1920x1200.jpg', 0, '2022-04-04 18:03:58', '2022-04-04 18:03:58'),
(21, 'Alexander', 'avendao', 51651, 'Un titulo ahi', 'ajksdjnajkndaknsjkankjsnajknj kjasndjandjnasjkn', 'abstraction_shapes_dark_background_115105_1920x1200.jpg', 1, '2022-04-04 18:04:36', '2022-04-04 19:26:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Cedula` int(11) NOT NULL,
  `Edad` int(2) NOT NULL,
  `rol` varchar(30) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID`, `Nombre`, `Apellido`, `Email`, `Password`, `Cedula`, `Edad`, `Rol`, `CreatedDate`, `updatedAt`) VALUES
(2, 'Alexander', 'Ramirez', 'avendano.ramirez@gmail.com', '$2a$10$X/2XiapRQD8WAPLO5mQzFeRrf/Rtdlr9oMA62pnQQGJ7eCpNmkpIi', 29694896, 20, 'user', '2022-04-03 23:29:37', '2022-04-04 01:01:23');

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
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);


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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
